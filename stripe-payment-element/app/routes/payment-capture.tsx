import type { LoaderFunction } from '@remix-run/node';
import { json } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { Heading } from '~/components/Heading';

export const loader: LoaderFunction = async ({ request }) => {
  return json({
    ENV: {
      STRIPE_PUBLISHABLE_KEY: process.env.STRIPE_PUBLISHABLE_KEY
    }
  });
};

export default function PaymentCapture() {
  const { ENV } = useLoaderData();

  return (
    <div>
      <Heading text="Payment method" />
    </div>
  );
}
