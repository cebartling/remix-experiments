import type { ActionFunction, LoaderFunction } from '@remix-run/node';
import { json } from '@remix-run/node';
import { useActionData } from '@remix-run/react';
import { withZod } from '@remix-validated-form/with-zod';
import { z } from 'zod';
import { ValidatedForm, validationError } from 'remix-validated-form';
import { FormInput } from '~/components/FormInput';
import { SubmitButton } from '~/components/SubmitButton';
import { Alert } from '~/components/Alert';
import { Heading } from '~/components/Heading';

export const loader: LoaderFunction = async ({ request }) => {
  return json({});
};

export const validator = withZod(
  z.object({
    firstName: z.string().min(1, { message: 'First name is required' }),
    lastName: z.string().min(1, { message: 'Last name is required' }),
    email: z
      .string()
      .min(1, { message: 'Email is required' })
      .email('Must be a valid email')
  })
);

export default function Customer() {
  const data = useActionData();

  return (
    <div>
      <Heading text="New customer" />
      <ValidatedForm validator={validator} method="post" className="form">
        <FormInput name="firstName" label="First Name" />
        <FormInput name="lastName" label="Last Name" />
        <FormInput name="email" label="Email" />
        {data && (
          <Alert variant="info" title={data.title} details={data.description} />
        )}
        <SubmitButton />
      </ValidatedForm>
    </div>
  );
}

export const action: ActionFunction = async ({ request }) => {
  const validatedFormData = await validator.validate(await request.formData());
  if (validatedFormData.error) return validationError(validatedFormData.error);
  const { firstName, lastName, email } = validatedFormData.data;

  return json({
    title: `Hi ${firstName} ${lastName}!`,
    description: `Your email is ${email}`
  });
};
