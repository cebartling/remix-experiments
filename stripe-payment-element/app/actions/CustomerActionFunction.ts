import type { ActionFunction } from '@remix-run/node';
import { redirect } from '@remix-run/node';
import { getSessionData, sessionCookie } from '~/cookies';
import { validationError } from 'remix-validated-form';
import type {
  CreateCustomerParams,
  CreateSubscriptionParams
} from '~/services/stripe.server';
import { createCustomer, createSubscription } from '~/services/stripe.server';
import type Stripe from 'stripe';
import { ROUTE_PAYMENT_ELEMENT_PROMO_CODE } from '~/route-constants';
import { customerValidator } from '~/validators/validators';

const customerActionFunction: ActionFunction = async ({ request }) => {
  const sessionData = await getSessionData(request);
  const validatedFormData = await customerValidator.validate(
    await request.formData()
  );
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
  sessionData.stripePriceId = process.env.STRIPE_STANDARD_SERVICE_PRICE_ID!;
  sessionData.stripeCustomerId = stripeCustomer.id;

  return redirect(ROUTE_PAYMENT_ELEMENT_PROMO_CODE, {
    headers: {
      'Set-Cookie': await sessionCookie.serialize(sessionData)
    }
  });
};

export default customerActionFunction;
