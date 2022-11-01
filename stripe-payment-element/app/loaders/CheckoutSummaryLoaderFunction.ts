import type { LoaderFunction } from '@remix-run/node';
import { json } from '@remix-run/node';
import { getSessionData, sessionCookie } from '~/cookies';
import { getPrice } from '~/services/stripe.server';

const checkoutSummaryLoaderFunction: LoaderFunction = async ({ request }) => {
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

export default checkoutSummaryLoaderFunction;
