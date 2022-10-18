import type { LoaderFunction } from '@remix-run/node';
import { json } from '@remix-run/node';
import { Heading } from '~/components/Heading';
import { Elements } from '@stripe/react-stripe-js';
import { useLoaderData } from '@remix-run/react';
import StripePaymentIntent from '~/components/StripePaymentIntent';
import { loadStripe } from '@stripe/stripe-js';

export const loader: LoaderFunction = async ({ request }) => {
  // Retrieve the "setup_intent_client_secret" query parameter appended to
  // your return_url by Stripe.js
  const url = new URL(request.url);
  const stripePaymentIntentClientSecret = url.searchParams.get(
    'payment_intent_client_secret'
  );
  console.log('===> Client secret', stripePaymentIntentClientSecret);

  return json({
    ENV: {
      STRIPE_PUBLISHABLE_KEY: process.env.STRIPE_PUBLISHABLE_KEY
    },
    stripePaymentIntentClientSecret
  });
};

export default function PaymentCaptureStatus() {
  const { ENV, stripePaymentIntentClientSecret } = useLoaderData();
  const stripePromise = loadStripe(ENV.STRIPE_PUBLISHABLE_KEY);
  const options = { clientSecret: stripePaymentIntentClientSecret };

  return (
    <div>
      <Heading text="Payment method successfully captured" />
      <Elements stripe={stripePromise} options={options}>
        <StripePaymentIntent
          stripePaymentIntentClientSecret={stripePaymentIntentClientSecret}
        />
      </Elements>
    </div>
  );
}
