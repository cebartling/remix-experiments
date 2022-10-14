import { useIsSubmitting } from 'remix-validated-form';

export const SubmitButton = () => {
  const isSubmitting = useIsSubmitting();

  return (
    <button type="submit" disabled={isSubmitting} className="btn btn-blue">
      {isSubmitting ? 'Submitting...' : 'Submit'}
    </button>
  );
};
