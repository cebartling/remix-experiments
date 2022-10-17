import type { LoaderFunction } from '@remix-run/node';
import { json } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { Heading } from '~/components/Heading';
import { getSessionData } from '~/cookies';
import StripePaymentDetails from '~/components/StripePaymentDetails';
import type {
  DefaultValuesOption,
  FieldsOption,
  StripePaymentElementOptions
} from '@stripe/stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { ROUTE_PAYMENT_ELEMENT_PAYMENT_CAPTURE_STATUS } from '~/route-constants';

export const loader: LoaderFunction = async ({ request }) => {
  const sessionData = await getSessionData(request);

  console.log(sessionData);

  return json({
    ENV: {
      STRIPE_PUBLISHABLE_KEY: process.env.STRIPE_PUBLISHABLE_KEY,
      STRIPE_STANDARD_SERVICE_PRICE_ID:
        process.env.STRIPE_STANDARD_SERVICE_PRICE_ID,
      PAYMENT_CAPTURE_STATUS_URL: `${process.env.BASE_URL}${ROUTE_PAYMENT_ELEMENT_PAYMENT_CAPTURE_STATUS}`
    },
    sessionData
  });
};

export default function PaymentCapture() {
  const { ENV, sessionData } = useLoaderData();
  const stripePromise = loadStripe(ENV.STRIPE_PUBLISHABLE_KEY);
  const options = { clientSecret: sessionData.stripeClientSecret };

  const paymentElementOptions = {
    defaultValues: {
      billingDetails: {
        address: { postalCode: sessionData.postalCode }
      }
    } as DefaultValuesOption,
    fields: {
      billingDetails: {
        name: 'auto',
        address: { postalCode: 'auto', country: 'never' }
      }
    } as FieldsOption
    // wallets: { applePay: 'auto', googlePay: 'auto' } as WalletsOption
  } as StripePaymentElementOptions;

  return (
    <>
      <Heading text="Payment method" />
      <Elements stripe={stripePromise} options={options}>
        <StripePaymentDetails
          paymentElementOptions={paymentElementOptions}
          paymentCatureStatusUrl={ENV.PAYMENT_CAPTURE_STATUS_URL}
          stripePriceId={ENV.STRIPE_STANDARD_SERVICE_PRICE_ID}
        />
      </Elements>
    </>
  );
}
