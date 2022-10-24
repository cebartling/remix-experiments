import auth0 from 'auth0-js';

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
            <button
              className="ml-8 inline-flex items-center justify-center whitespace-nowrap rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
              onClick={handleOnClickSignInWithGoogleButton}
            >
              Sign in with Google
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
