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
  function handleOnClickSignInWithGoogleButton() {
    const webAuth = new auth0.WebAuth({
      domain: auth0Domain,
      clientID: auth0ClientId,
    });

    // Trigger login with google
    webAuth.authorize({
      connection: 'google-oauth2',
      // scope: 'read:order write:order',
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
