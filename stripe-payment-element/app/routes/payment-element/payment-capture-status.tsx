import type { LoaderFunction } from '@remix-run/node';
import { json } from '@remix-run/node';
import { Heading } from '~/components/Heading';
import { useStripe } from '@stripe/react-stripe-js';
import { useEffect, useState } from 'react';
import { useLoaderData } from '@remix-run/react';

export const loader: LoaderFunction = async ({ request }) => {
  // Retrieve the "setup_intent_client_secret" query parameter appended to
  // your return_url by Stripe.js
  const stripePaymentIntentClientSecret = new URLSearchParams(
    window.location.search
  ).get('payment_intent_client_secret');
  console.log('===> Client secret', stripePaymentIntentClientSecret);

  return json({
    stripePaymentIntentClientSecret
  });
};

export default function PaymentCaptureStatus() {
  const { stripePaymentIntentClientSecret } = useLoaderData();
  const stripe = useStripe();
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    if (!stripe) {
      return;
    }

    stripe
      .retrievePaymentIntent(stripePaymentIntentClientSecret)
      .then(({ paymentIntent }) => {
        switch (paymentIntent?.status) {
          case 'succeeded':
            setMessage('Success! Your payment details has been saved.');
            break;

          case 'processing':
            setMessage(
              "Processing payment details. We'll update you when processing is complete."
            );
            break;

          case 'requires_payment_method':
            // Redirect your user back to your payment page to attempt collecting
            // payment again
            setMessage(
              'Failed to process payment details. Please try another payment method.'
            );
            break;
        }
      });
  }, [stripe]);

  return (
    <div>
      <Heading text="Payment method successfully captured" />
      {message ? <div className="stripe-message">{message}</div> : null}
    </div>
  );
}
