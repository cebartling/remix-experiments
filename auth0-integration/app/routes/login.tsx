import { Form } from '@remix-run/react';

export default function Login() {
  return (
    <Form action="/auth/auth0" method="post" className="p-2 ">
      <button className="border-2">Login with Auth0</button>
    </Form>
  );
}
