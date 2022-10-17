import { Heading } from '~/components/Heading';
import { Link } from '@remix-run/react';
import { ROUTE_PAYMENT_ELEMENT_CUSTOMER } from '~/route-constants';

export default function Index() {
  return (
    <>
      <Heading text="Stripe subscription demos" />
      <Link className="btn btn-blue" to={ROUTE_PAYMENT_ELEMENT_CUSTOMER}>
        Create subscription using Payment Element
      </Link>
    </>
  );
}
