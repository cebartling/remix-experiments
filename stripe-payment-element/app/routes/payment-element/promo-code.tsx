import { useActionData } from '@remix-run/react';
import { Heading } from '~/components/Heading';
import { ValidatedForm } from 'remix-validated-form';
import { FormInput } from '~/components/FormInput';
import { SubmitButton } from '~/components/SubmitButton';
import type { ActionFunction } from '@remix-run/node';
import { promoCodeValidator } from '~/validators/validators';
import promoCodeAction from '~/actions/PromoCodeAction';

export default function PromoCode() {
  const data = useActionData();

  return (
    <>
      <Heading text="Promotions" />
      <ValidatedForm
        validator={promoCodeValidator}
        method="post"
        className="form"
      >
        <FormInput name="promoCode" label="Promo Code" />
        <div className="form-button-container">
          <SubmitButton />
        </div>
      </ValidatedForm>
    </>
  );
}

export const action: ActionFunction = promoCodeAction;
