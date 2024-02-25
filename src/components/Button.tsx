import styled, { CSSObject } from '@emotion/styled'

type ImportanceType = 'primary' | 'secondary' | 'tertiary'

type ButtonProps = {
  name: string;
  onClick: () => void;
  importance?: ImportanceType;
};

const styles: Record<ImportanceType, CSSObject> = {
  primary: {
    background: 'var(--dynamic-color)',
    border: '2px solid var(--dynamic-color)',
    color: 'var(--white)',
    '&:hover' : {
      background: 'transparent',
      color: 'var(--dynamic-color)',
    }
  },
  secondary: {
    border: '2px solid var(--dynamic-color)',
    '&:hover' : {
      borderColor: 'var(--contrast-color)'
    }
  },
  tertiary: {
    textDecoration: 'underline',
  }
}

const CustomButton = styled.button(({ importance }: { importance: ImportanceType}) => ({
	padding: '8px 12px',
  borderRadius: '4px',
  width: '100%',
  ...styles[importance]
}));

export const Button: React.FC<ButtonProps> = ({ name, importance = 'primary', onClick }) => {
  return <CustomButton importance={importance} onClick={onClick}>{name}</CustomButton>;
};
