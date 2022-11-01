import type { ActionFunction } from '@remix-run/node';
import { redirect } from '@remix-run/node';
import { getSessionData, sessionCookie } from '~/cookies';
import { promoCodeValidator } from '~/validators/validators';
import type { ValidatorError } from 'remix-validated-form';
import { validationError } from 'remix-validated-form';
import {
  createSubscription,
  resolvePromoCode,
  updateCustomerWithCoupon
} from '~/services/stripe.server';
import { ROUTE_PAYMENT_ELEMENT_CHECKOUT_SUMMARY } from '~/route-constants';
import type Stripe from 'stripe';

const promoCodeActionFunction: ActionFunction = async ({ request }) => {
  const sessionData = await getSessionData(request);
  const validatedFormData = await promoCodeValidator.validate(
    await request.formData()
  );
  if (validatedFormData.error) return validationError(validatedFormData.error);
  const { promoCode } = validatedFormData.data;
  sessionData.stripePromotionCodeId = null;
  sessionData.stripeCouponId = null;
  sessionData.stripeCouponPercentOff = 0;

  if (promoCode) {
    const promotionCodes = await resolvePromoCode({ promoCode });
    if (promotionCodes.data?.length === 1) {
      const promotionCode = promotionCodes.data[0];
      const updatedCustomer = await updateCustomerWithCoupon({
        stripeCustomerId: sessionData.stripeCustomerId,
        stripeCouponId: promotionCode.coupon.id
      });
      // Create an incomplete subscription
      const stripeSubscription = await createSubscription({
        stripeCustomerId: sessionData.stripeCustomerId,
        stripePriceId: process.env.STRIPE_STANDARD_SERVICE_PRICE_ID!
      });
      const latestInvoice = stripeSubscription.latest_invoice as Stripe.Invoice;
      const paymentIntent =
        latestInvoice?.payment_intent as Stripe.PaymentIntent;
      sessionData.stripeClientSecret = paymentIntent?.client_secret!;
      sessionData.stripeSubscriptionId = stripeSubscription.id;
      // const updatedSubscription = await updateSubscriptionWithCoupon({
      //   subscriptionId: sessionData.stripeSubscriptionId,
      //   couponId: promotionCode.coupon.id
      // });
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

export default promoCodeActionFunction;
