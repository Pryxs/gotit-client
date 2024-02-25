import styled from '@emotion/styled'

const CustomInput = styled.input({
    padding: '8px 12px',
    borderRadius: '4px',
    outline: 'none',
    border: '2px solid var(--dark)',
    background: 'white',
    width: '100%',
    '&:focus-visible'  : {
        borderColor: 'var(--contrast-color)',
    }
})

type InputProps = {
    value: string;
    onChange: (value: any) => void;
    props?: {};
};

export const Input: React.FC<InputProps> = ({ value, onChange, props }) => {
    return <CustomInput value={value} onChange={onChange} {...props}/>
};
