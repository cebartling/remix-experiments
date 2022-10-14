import { useState } from 'react';
import type { StripePaymentElementOptions } from '@stripe/stripe-js';
import {
  PaymentElement,
  useElements,
  useStripe
} from '@stripe/react-stripe-js';

type StripePaymentDetailsProps = {
  stripePriceId: string;
  paymentSuccessUrl: string;
  paymentElementOptions: StripePaymentElementOptions;
};

export default function StripePaymentDetails({
  paymentSuccessUrl,
  paymentElementOptions
}: StripePaymentDetailsProps) {
  const stripe = useStripe();
  const elements = useElements();
  const [message, setMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    setIsLoading(true);

    const { error } = await stripe.confirmSetup({
      elements,
      confirmParams: {
        payment_method_data: {
          billing_details: { address: { country: 'us' } }
        },
        return_url: paymentSuccessUrl
      }
    });
    console.log('====> Handle submit', error);

    // This point will only be reached if there is an immediate error when
    // confirming the payment. Otherwise, your customer will be redirected to
    // your `return_url`. For some payment methods like iDEAL, your customer will
    // be redirected to an intermediate site first to authorize the payment, then
    // redirected to the `return_url`.
    if (error.type === 'card_error' || error.type === 'validation_error') {
      setMessage(error.message!);
    } else {
      setMessage('An unexpected error occurred.');
    }

    setIsLoading(false);
  };

  return (
    <div className="fixed-width">
      <form id="payment-form" onSubmit={handleSubmit}>
        <div className="mt-3">
          <PaymentElement
            id="payment-element"
            options={paymentElementOptions}
          />
        </div>
        <div>
          <button
            disabled={isLoading || !stripe || !elements}
            id="submit"
            className="subscribe-button"
          >
            {/*<span id="button-text">*/}
            {isLoading ? 'Submitting payment information...' : 'Subscribe'}
            {/*</span>*/}
          </button>
        </div>
        <div className="error-message">
          {message ? <div id="payment-message">{message}</div> : null}
        </div>
      </form>
    </div>
  );
}
