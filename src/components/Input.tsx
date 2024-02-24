

type InputProps = {
    value: string;
    onChange: (value: any) => void;
    props?: {};
};

export const Input: React.FC<InputProps> = ({ value, onChange, props }) => {
    return <input value={value} onChange={onChange} {...props}/>
};
