import type { LoaderFunction } from '@remix-run/node';
import { json } from '@remix-run/node';
import { getSessionData } from '~/cookies';
import { ROUTE_PAYMENT_ELEMENT_PAYMENT_CAPTURE_STATUS } from '~/route-constants';

const paymentCaptureLoaderFunction: LoaderFunction = async ({ request }) => {
  const sessionData = await getSessionData(request);

  return json({
    ENV: {
      STRIPE_PUBLISHABLE_KEY: process.env.STRIPE_PUBLISHABLE_KEY,
      PAYMENT_CAPTURE_STATUS_URL: `${process.env.BASE_URL}${ROUTE_PAYMENT_ELEMENT_PAYMENT_CAPTURE_STATUS}`
    },
    sessionData
  });
};

export default paymentCaptureLoaderFunction;
