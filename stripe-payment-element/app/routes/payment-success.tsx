import type { LoaderFunction } from '@remix-run/node';
import { json } from '@remix-run/node';
import { Heading } from '~/components/Heading';
import { useStripe } from '@stripe/react-stripe-js';
import { useEffect, useState } from 'react';

export const loader: LoaderFunction = async ({ request }) => {
  return json({});
};

export default function PaymentSuccess() {
  const stripe = useStripe();
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    if (!stripe) {
      return;
    }

    // Retrieve the "setup_intent_client_secret" query parameter appended to
    // your return_url by Stripe.js
    const clientSecret = new URLSearchParams(window.location.search).get(
      'payment_intent_client_secret'
    );
    console.log('===> Client secret', clientSecret);

    if (!clientSecret) {
      return;
    }

    stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
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
