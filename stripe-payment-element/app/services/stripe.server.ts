import Stripe from 'stripe';

export const createCustomer = async ({
  name,
  email,
  city,
  addressLine1,
  state,
  postalCode
}: {
  email: string;
  name: string;
  city: string;
  addressLine1: string;
  postalCode: string;
  state: string;
}) => {
  const stripeConfig = {} as Stripe.StripeConfig;
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, stripeConfig);
  return await stripe.customers.create({
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
  } as Stripe.CustomerCreateParams);
};

export const createSubscription = async ({
  stripeCustomerId,
  stripePriceId
}: {
  stripeCustomerId: string;
  stripePriceId: string;
}) => {
  const stripeConfig = {} as Stripe.StripeConfig;
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, stripeConfig);
  return await stripe.subscriptions.create({
    customer: stripeCustomerId,
    items: [
      {
        price: stripePriceId
      }
    ],
    payment_behavior: 'default_incomplete',
    payment_settings: { save_default_payment_method: 'on_subscription' },
    expand: ['latest_invoice.payment_intent']
  });
};

export const resolvePromoCode = ({
  promoCode
}: {
  promoCode: string;
}): Stripe.ApiListPromise<Stripe.PromotionCode> => {
  const stripeConfig = {} as Stripe.StripeConfig;
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, stripeConfig);
  const apiListPromise = stripe.promotionCodes.list({
    code: promoCode,
    limit: 1
  });
  return apiListPromise;
};

export const getPrice = async (id: string) => {
  const stripeConfig = {} as Stripe.StripeConfig;
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, stripeConfig);
  return await stripe.prices.retrieve(id);
};

export const updateSubscriptionWithCoupon = async ({
  subscriptionId,
  couponId
}: {
  subscriptionId: string;
  couponId: string;
}) => {
  const stripeConfig = {} as Stripe.StripeConfig;
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, stripeConfig);
  return await stripe.subscriptions.update(subscriptionId, {
    coupon: couponId
  } as Stripe.SubscriptionUpdateParams);
};

export const updateCustomerWithCoupon = async ({
  stripeCustomerId,
  stripeCouponId
}: {
  stripeCustomerId: string;
  stripeCouponId: string;
}) => {
  const stripeConfig = {} as Stripe.StripeConfig;
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, stripeConfig);
  return await stripe.customers.update(stripeCustomerId, {
    coupon: stripeCouponId
  } as Stripe.CustomerUpdateParams);
};
