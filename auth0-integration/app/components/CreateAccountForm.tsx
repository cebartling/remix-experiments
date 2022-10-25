import type { ParseHashOptions } from 'auth0-js';
import auth0 from 'auth0-js';
import SignIntoGoogleButton from '~/components/SignIntoGoogleButton';

interface CreateAccountFormProps {
  auth0Domain: string;
  auth0ClientId: string;
  redirectUri: string;
}

export default function CreateAccountForm({
  auth0Domain,
  auth0ClientId,
  redirectUri,
}: CreateAccountFormProps) {
  const webAuth = new auth0.WebAuth({
    domain: auth0Domain,
    clientID: auth0ClientId,
  });

  try {
    webAuth.parseHash(
      { hash: window.location.hash } as ParseHashOptions,
      function (err, authResult) {
        if (err) {
          return console.log(err);
        }
        webAuth.client.userInfo(authResult?.accessToken!, function (err, user) {
          // This method will make a request to the /userinfo endpoint
          // and return the user object, which contains the user's information,
          // similar to the response below.
          console.log(user);
        });
      },
    );
  } catch (e) {}

  function handleOnClickSignInWithGoogleButton() {
    // Trigger login with google
    webAuth.authorize({
      connection: 'google-oauth2',
      scope: 'openid profile email',
      responseType: 'token',
      redirectUri,
    });
  }

  return (
    <div className="bg-white py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center">
          <h2 className="text-base font-semibold uppercase tracking-wide text-indigo-600">
            Create Account
          </h2>
          <p className="mt-2 text-3xl font-extrabold leading-8 tracking-tight text-gray-900 sm:text-4xl">
            You want to give us money, right?!!
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
            <SignIntoGoogleButton
              onClick={handleOnClickSignInWithGoogleButton}
            />
          </p>
        </div>
      </div>
    </div>
  );
}
