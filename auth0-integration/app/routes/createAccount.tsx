import type { LoaderFunction } from '@remix-run/node';
import { json } from '@remix-run/node';
import UnauthenticatedHeader from '~/components/UnauthenticatedHeader';
import CreateAccountForm from '~/components/CreateAccountForm';
import { useLoaderData } from '@remix-run/react';

export let loader: LoaderFunction = ({ request }) => {
  return json({
    ENV: {
      auth0Domain: process.env.AUTH0_DOMAIN,
      auth0ClientId: process.env.AUTH0_CLIENT_ID,
      redirectUri: `${process.env.BASE_URL}/createAccount`,
    },
  });
};

export default function CreateAccount() {
  const { ENV } = useLoaderData();
  const { auth0Domain, auth0ClientId, redirectUri } = ENV;

  return (
    <>
      <UnauthenticatedHeader />
      <CreateAccountForm
        auth0Domain={auth0Domain}
        auth0ClientId={auth0ClientId}
        redirectUri={redirectUri}
      />
    </>
  );
}
