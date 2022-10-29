import type { ActionFunction } from '@remix-run/node';
import { useActionData } from '@remix-run/react';
import { ValidatedForm } from 'remix-validated-form';
import { FormInput } from '~/components/FormInput';
import { SubmitButton } from '~/components/SubmitButton';
import { Heading } from '~/components/Heading';
import customerAction from '~/actions/CustomerAction';
import { customerValidator } from '~/validators/CustomerValidator';

export default function Customer() {
  const data = useActionData();

  return (
    <>
      <Heading text="New customer" />
      <ValidatedForm
        validator={customerValidator}
        method="post"
        className="form"
      >
        <FormInput name="name" label="Full name" />
        <FormInput name="email" label="Email" />
        <FormInput name="addressLine1" label="Address" />
        <FormInput name="city" label="City" />
        <FormInput name="state" label="State" />
        <FormInput name="postalCode" label="Postal code" />
        <div className="form-button-container">
          <SubmitButton />
        </div>
      </ValidatedForm>
    </>
  );
}

export const action: ActionFunction = customerAction;
