import { withZod } from '@remix-validated-form/with-zod';
import { z } from 'zod';
import { useActionData } from '@remix-run/react';
import { Heading } from '~/components/Heading';
import type { ValidatorError } from 'remix-validated-form';
import { ValidatedForm, validationError } from 'remix-validated-form';
import { FormInput } from '~/components/FormInput';
import { SubmitButton } from '~/components/SubmitButton';
import type { ActionFunction } from '@remix-run/node';
import { redirect } from '@remix-run/node';
import { getSessionData, sessionCookie } from '~/cookies';
import { ROUTE_PAYMENT_ELEMENT_CHECKOUT_SUMMARY } from '~/route-constants';
import {
  resolvePromoCode,
  updateSubscriptionWithCoupon
} from '~/services/stripe.server';

export const validator = withZod(
  z.object({
    promoCode: z.string().optional()
  })
);

export default function PromoCode() {
  const data = useActionData();

  return (
    <>
      <Heading text="Promotions" />
      <ValidatedForm validator={validator} method="post" className="form">
        <FormInput name="promoCode" label="Promo Code" />
        <div className="form-button-container">
          <SubmitButton />
        </div>
      </ValidatedForm>
    </>
  );
}

export const action: ActionFunction = async ({ request }) => {
  const sessionData = await getSessionData(request);
  const validatedFormData = await validator.validate(await request.formData());
  if (validatedFormData.error) return validationError(validatedFormData.error);
  const { promoCode } = validatedFormData.data;
  sessionData.stripePromotionCodeId = null;
  sessionData.stripeCouponId = null;
  sessionData.stripeCouponPercentOff = 0;

  if (promoCode) {
    const promotionCodes = await resolvePromoCode({ promoCode });
    if (promotionCodes.data?.length === 1) {
      const promotionCode = promotionCodes.data[0];
      const updatedSubscription = await updateSubscriptionWithCoupon({
        subscriptionId: sessionData.stripeSubscriptionId,
        couponId: promotionCode.coupon.id
      });
      sessionData.stripePromotionCodeId = promotionCode.id;
      sessionData.stripeCouponId = promotionCode.coupon.id;
      sessionData.stripeCouponPercentOff = promotionCode.coupon.percent_off
        ? promotionCode.coupon.percent_off / 100
        : 0;
    } else {
      return validationError({
        fieldErrors: {
          promoCode: 'The supplied promo code is invalid.'
        } as Record<string, string>
      } as ValidatorError);
    }
  }

  return redirect(ROUTE_PAYMENT_ELEMENT_CHECKOUT_SUMMARY, {
    headers: {
      'Set-Cookie': await sessionCookie.serialize(sessionData)
    }
  });
};
