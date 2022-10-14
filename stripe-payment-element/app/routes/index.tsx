import { Heading } from '~/components/Heading';
import { Link } from '@remix-run/react';

export default function Index() {
  return (
    <>
      <Heading text="Stripe Payment Element demo" />
      <Link className="btn btn-blue" to="/customer">
        Create a new customer
      </Link>
    </>
  );
}
