import Stripe from 'stripe';

export interface CreateCustomerParams {
  email: string;
  name: string;
  city: string;
  addressLine1: string;
  postalCode: string;
  state: string;
}

export const createCustomer = async ({
  name,
  email,
  city,
  addressLine1,
  state,
  postalCode
}: CreateCustomerParams) => {
  const stripeConfig = {} as Stripe.StripeConfig;
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, stripeConfig);
  return await stripe.customers.create(
    {
      email,
      name,
      shipping: {
        address: {
          city,
          country: 'US',
          line1: addressLine1,
          postal_code: postalCode,
          state
        },
        name
      },
      address: {
        city,
        country: 'US',
        line1: addressLine1,
        postal_code: postalCode,
        state
      }
    } as Stripe.CustomerCreateParams,
    {} as Stripe.RequestOptions
  );
};

export interface CreateSubscriptionParams {
  stripeCustomerId: string;
}

export const createSubscription = async ({
  stripeCustomerId
}: CreateSubscriptionParams) => {
  const stripeConfig = {} as Stripe.StripeConfig;
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, stripeConfig);
  return await stripe.subscriptions.create({
    customer: stripeCustomerId,
    items: [
      {
        price: process.env.STRIPE_STANDARD_SERVICE_PRICE_ID
      }
    ],
    payment_behavior: 'default_incomplete',
    payment_settings: { save_default_payment_method: 'on_subscription' },
    expand: ['latest_invoice.payment_intent']
  });
};
