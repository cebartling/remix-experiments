import { useStripe } from '@stripe/react-stripe-js';
import { useEffect, useState } from 'react';

export interface StripePaymentIntentProps {
  stripePaymentIntentClientSecret: string;
}

export default function StripePaymentIntent({
  stripePaymentIntentClientSecret
}: StripePaymentIntentProps) {
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
      {message ? <div className="stripe-message">{message}</div> : null}
    </div>
  );
}
