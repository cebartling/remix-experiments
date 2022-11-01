import type { LoaderFunction } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { Heading } from '~/components/Heading';
import StripePaymentCapture from '~/components/StripePaymentCapture';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import paymentCaptureLoaderFunction from '~/loaders/PaymentCaptureLoaderFunction';

export const loader: LoaderFunction = paymentCaptureLoaderFunction;

export default function PaymentCapture() {
  const { ENV, sessionData } = useLoaderData();
  const stripePromise = loadStripe(ENV.STRIPE_PUBLISHABLE_KEY);
  const options = { clientSecret: sessionData.stripeClientSecret };

  return (
    <>
      <Heading text="Payment method" />
      <Elements stripe={stripePromise} options={options}>
        <StripePaymentCapture
          paymentCatureStatusUrl={ENV.PAYMENT_CAPTURE_STATUS_URL}
          postalCode={sessionData.postalCode}
        />
      </Elements>
    </>
  );
}
