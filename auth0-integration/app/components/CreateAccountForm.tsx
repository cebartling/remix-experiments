import type {
  Auth0DecodedHash,
  Auth0Error,
  Auth0UserProfile,
  ParseHashOptions,
} from 'auth0-js';
import auth0 from 'auth0-js';
import SignUpWithGoogleButton from '~/components/SignUpWithGoogleButton';

export default function CreateAccountForm({
  auth0Domain,
  auth0ClientId,
  redirectUri,
}: {
  auth0Domain: string;
  auth0ClientId: string;
  redirectUri: string;
}) {
  const webAuth = new auth0.WebAuth({
    domain: auth0Domain,
    clientID: auth0ClientId,
  } as auth0.AuthOptions);

  try {
    webAuth.parseHash(
      { hash: window.location.hash } as ParseHashOptions,
      function (
        err: null | (Auth0Error & { state?: string | undefined }),
        authResult: Auth0DecodedHash | null,
      ) {
        if (err) {
          return console.log(err);
        }
        webAuth.client.userInfo(
          authResult?.accessToken!,
          function (err: null | Auth0Error, user: Auth0UserProfile) {
            // This method will make a request to the /userinfo endpoint
            // and return the user object, which contains the user's information,
            // similar to the response below.
            console.log('Auth0UserProfile', user);
          },
        );
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
          <div className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
            <SignUpWithGoogleButton
              onClick={handleOnClickSignInWithGoogleButton}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
