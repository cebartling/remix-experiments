import type { LoaderFunction } from '@remix-run/node';
import { json } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { Heading } from '~/components/Heading';
import { getSessionData } from '~/cookies';
import StripePaymentDetails from '~/components/StripePaymentDetails';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { ROUTE_PAYMENT_ELEMENT_PAYMENT_CAPTURE_STATUS } from '~/route-constants';

export const loader: LoaderFunction = async ({ request }) => {
  const sessionData = await getSessionData(request);

  console.log(sessionData);

  return json({
    ENV: {
      STRIPE_PUBLISHABLE_KEY: process.env.STRIPE_PUBLISHABLE_KEY,
      PAYMENT_CAPTURE_STATUS_URL: `${process.env.BASE_URL}${ROUTE_PAYMENT_ELEMENT_PAYMENT_CAPTURE_STATUS}`
    },
    sessionData
  });
};

export default function PaymentCapture() {
  const { ENV, sessionData } = useLoaderData();
  const stripePromise = loadStripe(ENV.STRIPE_PUBLISHABLE_KEY);
  const options = { clientSecret: sessionData.stripeClientSecret };

  return (
    <>
      <Heading text="Payment method" />
      <Elements stripe={stripePromise} options={options}>
        <StripePaymentDetails
          paymentCatureStatusUrl={ENV.PAYMENT_CAPTURE_STATUS_URL}
          postalCode={sessionData.postalCode}
        />
      </Elements>
    </>
  );
}
