import type { LoaderFunction } from '@remix-run/node';
import { Heading } from '~/components/Heading';
import { Elements } from '@stripe/react-stripe-js';
import { useLoaderData } from '@remix-run/react';
import StripePaymentIntent from '~/components/StripePaymentIntent';
import { loadStripe } from '@stripe/stripe-js';
import paymentCaptureStatusLoaderFunction from '~/loaders/PaymentCaptureStatusLoaderFunction';

export const loader: LoaderFunction = paymentCaptureStatusLoaderFunction;

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
