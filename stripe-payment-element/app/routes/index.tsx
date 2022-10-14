import { Heading } from '~/components/Heading';
import { Link } from '@remix-run/react';

export default function Index() {
  return (
    <div>
      <Heading text="Stripe Payment Element demo" />
      <Link to="/customer">Create a new customer</Link>
    </div>
  );
}
