import type { ActionFunction } from '@remix-run/node';
import { redirect } from '@remix-run/node';
import { getSessionData, sessionCookie } from '~/cookies';
import { ROUTE_PAYMENT_ELEMENT_PAYMENT_CAPTURE } from '~/route-constants';

const checkoutSummaryActionFunction: ActionFunction = async ({ request }) => {
  const sessionData = await getSessionData(request);

  return redirect(ROUTE_PAYMENT_ELEMENT_PAYMENT_CAPTURE, {
    headers: {
      'Set-Cookie': await sessionCookie.serialize(sessionData)
    }
  });
};

export default checkoutSummaryActionFunction;
