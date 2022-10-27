import { Heading } from '~/components/Heading';
import type { ActionFunction, LoaderFunction } from '@remix-run/node';
import { json, redirect } from '@remix-run/node';
import { getSessionData, sessionCookie } from '~/cookies';
import { ROUTE_PAYMENT_ELEMENT_PAYMENT_CAPTURE } from '~/route-constants';
import { getPrice } from '~/services/stripe.server';
import { Form, useLoaderData } from '@remix-run/react';

function renderCents(amount: number): string {
  return amount < 10 ? `0${amount}` : `${amount}`;
}

function renderCurrency(amount: number): string {
  const dollars = Math.floor(amount / 100);
  const cents = amount % 100;
  return `${dollars}.${renderCents(cents)}`;
}

export const loader: LoaderFunction = async ({ request }) => {
  const sessionData = await getSessionData(request);
  const stripePrice = await getPrice(sessionData.stripePriceId);
  const discount =
    sessionData.stripeCouponPercentOff * stripePrice.unit_amount!;

  return json(
    {
      initialPrice: stripePrice.unit_amount!,
      discount,
      discountedPrice: stripePrice.unit_amount! - discount
    },
    {
      headers: {
        'Set-Cookie': await sessionCookie.serialize(sessionData)
      }
    }
  );
};

export default function CheckoutSummary() {
  const { initialPrice, discount, discountedPrice } = useLoaderData();

  return (
    <>
      <Heading text="Checkout Summary" />
      <div className="mt-2">
        <table className="table-fixed fixed-width">
          <thead>
            <tr>
              <th className="text-left">Description</th>
              <th className="text-right">Amount</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Initial price</td>
              <td className="text-right">${renderCurrency(initialPrice)}</td>
            </tr>
            <tr>
              <td>Discount</td>
              <td className="text-right">${renderCurrency(discount)}</td>
            </tr>
            <tr>
              <td>First month price</td>
              <td className="text-right">${renderCurrency(discountedPrice)}</td>
            </tr>
          </tbody>
        </table>
        <Form method="post">
          <button type="submit" className="primary-button">
            Continue
          </button>
        </Form>
      </div>
    </>
  );
}

export const action: ActionFunction = async ({ request }) => {
  const sessionData = await getSessionData(request);

  return redirect(ROUTE_PAYMENT_ELEMENT_PAYMENT_CAPTURE, {
    headers: {
      'Set-Cookie': await sessionCookie.serialize(sessionData)
    }
  });
};
