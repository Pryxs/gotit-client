type ButtonProps = {
  name: string;
  onClick: () => void;
  type?: string;
};

export const Button: React.FC<ButtonProps> = ({ name, type, onClick }) => {
  return <button onClick={onClick}>{name}</button>;
};
