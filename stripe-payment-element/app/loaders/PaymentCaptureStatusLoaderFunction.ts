import type { LoaderFunction } from '@remix-run/node';
import { json } from '@remix-run/node';

const paymentCaptureStatusLoaderFunction: LoaderFunction = async ({
  request
}) => {
  // Retrieve the "setup_intent_client_secret" query parameter appended to
  // your return_url by Stripe.js
  const url = new URL(request.url);
  const stripePaymentIntentClientSecret = url.searchParams.get(
    'payment_intent_client_secret'
  );

  return json({
    ENV: {
      STRIPE_PUBLISHABLE_KEY: process.env.STRIPE_PUBLISHABLE_KEY
    },
    stripePaymentIntentClientSecret
  });
};

export default paymentCaptureStatusLoaderFunction;
