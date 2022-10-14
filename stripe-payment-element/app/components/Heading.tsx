type HeadingProps = {
  text: string;
};

export const Heading = ({ text }: HeadingProps) => {
  return <div className="text-3xl font-bold">{text}</div>;
};
