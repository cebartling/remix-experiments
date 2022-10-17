import type { ActionFunction } from '@remix-run/node';
import { redirect } from '@remix-run/node';
import { useActionData } from '@remix-run/react';
import { withZod } from '@remix-validated-form/with-zod';
import { z } from 'zod';
import { ValidatedForm, validationError } from 'remix-validated-form';
import type Stripe from 'stripe';
import { FormInput } from '~/components/FormInput';
import { SubmitButton } from '~/components/SubmitButton';
import { Heading } from '~/components/Heading';
import type {
  CreateCustomerParams,
  CreateSubscriptionParams
} from '~/services/stripe.server';
import { createCustomer, createSubscription } from '~/services/stripe.server';
import { getSessionData, sessionCookie } from '~/cookies';
import { ROUTE_PAYMENT_ELEMENT_PAYMENT_CAPTURE } from '~/route-constants';

export const validator = withZod(
  z.object({
    name: z.string().min(1, { message: 'Name is required' }),
    email: z
      .string()
      .min(1, { message: 'Email is required' })
      .email('Must be a valid email'),
    city: z.string().min(1, { message: 'City is required' }),
    addressLine1: z.string().min(1, { message: 'Address is required' }),
    postalCode: z.string().min(1, { message: 'Postal code is required' }),
    state: z.string().min(1, { message: 'State is required' })
  })
);

export default function Customer() {
  const data = useActionData();

  return (
    <>
      <Heading text="New customer" />
      <ValidatedForm validator={validator} method="post" className="form">
        <FormInput name="name" label="Full name" />
        <FormInput name="email" label="Email" />
        <FormInput name="addressLine1" label="Address" />
        <FormInput name="city" label="City" />
        <FormInput name="state" label="State" />
        <FormInput name="postalCode" label="Postal code" />
        <div className="customer-form-button-container">
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
  const { name, email, city, addressLine1, state, postalCode } =
    validatedFormData.data;

  // Create the Stripe customer
  const stripeCustomer = await createCustomer({
    name,
    email,
    city,
    addressLine1,
    state,
    postalCode
  } as CreateCustomerParams);

  // Create an incomplete subscription
  const stripeSubscription = await createSubscription({
    stripeCustomerId: stripeCustomer.id,
    stripePriceId: process.env.STRIPE_STANDARD_SERVICE_PRICE_ID
  } as CreateSubscriptionParams);

  const latestInvoice = stripeSubscription.latest_invoice as Stripe.Invoice;
  const paymentIntent = latestInvoice?.payment_intent as Stripe.PaymentIntent;
  sessionData.stripeClientSecret = paymentIntent?.client_secret!;
  sessionData.postalCode = postalCode;
  sessionData.stripeSubscriptionId = stripeSubscription.id;

  return redirect(ROUTE_PAYMENT_ELEMENT_PAYMENT_CAPTURE, {
    headers: {
      'Set-Cookie': await sessionCookie.serialize(sessionData)
    }
  });
};
