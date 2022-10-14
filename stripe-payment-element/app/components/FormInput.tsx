import { useField } from 'remix-validated-form';

type FormInputProps = {
  name: string;
  label: string;
};

export const FormInput = ({ name, label }: FormInputProps) => {
  const { error, getInputProps } = useField(name);

  function renderError() {
    if (error) {
      return <div className="error-message">{error}</div>;
    } else {
      return null;
    }
  }

  return (
    <div className="form-input-container">
      <label htmlFor={name} className="form-label">
        {label}
      </label>
      <input {...getInputProps({ id: name })} className="form-input" />
      {renderError()}
    </div>
  );
};
