import type { ActionFunction, LoaderFunction } from '@remix-run/node';
import { json, redirect } from '@remix-run/node';
import { useActionData } from '@remix-run/react';
import { withZod } from '@remix-validated-form/with-zod';
import { z } from 'zod';
import { ValidatedForm, validationError } from 'remix-validated-form';
import { FormInput } from '~/components/FormInput';
import { SubmitButton } from '~/components/SubmitButton';
import { Alert } from '~/components/Alert';
import { Heading } from '~/components/Heading';
import type {
  CreateCustomerParams,
  CreateSubscriptionParams
} from '~/services/stripe.server';
import { createCustomer, createSubscription } from '~/services/stripe.server';

export const loader: LoaderFunction = async ({ request }) => {
  return json({});
};

export const validator = withZod(
  z.object({
    name: z.string().min(1, { message: 'Name is required' }),
    email: z
      .string()
      .min(1, { message: 'Email is required' })
      .email('Must be a valid email'),
    city: z.string().min(1, { message: 'City is required' }),
    addressLine1: z.string().min(1, { message: 'Address is required' }),
    postalCode: z.string().min(1, { message: 'Postal code is required' }),
    state: z.string().min(1, { message: 'State is required' })
  })
);

export default function Customer() {
  const data = useActionData();

  return (
    <div>
      <Heading text="New customer" />
      <ValidatedForm validator={validator} method="post" className="form">
        <FormInput name="name" label="Full name" />
        <FormInput name="email" label="Email" />
        <FormInput name="addressLine1" label="Address" />
        <FormInput name="city" label="City" />
        <FormInput name="state" label="State" />
        <FormInput name="postalCode" label="Postal code" />
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
  const { name, email, city, addressLine1, state, postalCode } =
    validatedFormData.data;

  const stripeCustomer = await createCustomer({
    name,
    email,
    city,
    addressLine1,
    state,
    postalCode
  } as CreateCustomerParams);
  const stripeSubscription = await createSubscription({
    stripeCustomerId: stripeCustomer.id
  } as CreateSubscriptionParams);

  return redirect('/payment-capture');
};
