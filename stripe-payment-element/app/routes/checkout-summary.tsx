import { Heading } from '~/components/Heading';
import type { ActionFunction, LoaderFunction } from '@remix-run/node';
import { Form, useLoaderData } from '@remix-run/react';
import checkoutSummaryLoaderFunction from '~/loaders/CheckoutSummaryLoaderFunction';
import checkoutSummaryActionFunction from '~/actions/CheckoutSummaryActionFunction';
import renderCurrency from '~/utilities/RenderCurrency';

export const loader: LoaderFunction = checkoutSummaryLoaderFunction;
export const action: ActionFunction = checkoutSummaryActionFunction;

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
