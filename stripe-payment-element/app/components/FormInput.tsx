import { useField } from 'remix-validated-form';

type FormInputProps = {
  name: string;
  label: string;
};

// <div className="mb-4">
//   <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
//     Username
//   </label>
//   <input
//     className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//     id="username" type="text" placeholder="Username">
// </div>

export const FormInput = ({ name, label }: FormInputProps) => {
  const { error, getInputProps } = useField(name);
  return (
    <div className="form-input-container">
      <label htmlFor={name} className="form-label">
        {label}
      </label>
      <input {...getInputProps({ id: name })} className="form-input" />
      {error && <span className="error-message">{error}</span>}
    </div>
  );
};
