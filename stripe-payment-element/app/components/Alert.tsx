type AlertProps = {
  variant: string;
  title: string;
  details: any;
};

export const Alert = ({ variant, title, details }: AlertProps) => {
  return (
    <div className="alert">
      <div className="alert-title">{title}</div>
      <div className="alert-details">{details}</div>
    </div>
  );
};
