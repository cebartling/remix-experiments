import type { CookieOptions } from '@remix-run/node';
import { createCookie } from '@remix-run/node';

export interface SessionData {
  stripeSubscriptionId: string;
  stripeClientSecret: string;
  postalCode: string;
}

export const sessionCookie = createCookie('stripe-payment-element-session', {
  sameSite: 'lax',
  secure: false,
  maxAge: 1000 * 60 * 60 * 24
} as CookieOptions);

export async function getSessionData(request: Request): Promise<SessionData> {
  const cookieHeader = request.headers.get('Cookie');
  return (await sessionCookie.parse(cookieHeader)) || ({} as SessionData);
}
