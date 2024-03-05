import styled from '@emotion/styled'

const Container = styled.div({
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    label : {
        fontSize: '14px',
    }
})

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
    value?: string;
    onChange: (value: any) => void;
    label?: string;
    props?: {};
};

export const Input: React.FC<InputProps> = ({ value, onChange,label, props }) => (
    <Container className="field">
        <label>{label}</label>
        <CustomInput value={value} onChange={onChange} {...props}/>
    </Container>
)
