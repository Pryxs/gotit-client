import styled from '@emotion/styled'
import { ReactSVG } from 'react-svg'

const ContainerButton = styled.button(({ color, hoverColor, size, disabled }: { color?: string, hoverColor?: string, size?: number, disabled: boolean}) => ({
    'svg' : {
        color: color ?? 'var(--dynamic-color)',
    },
    '&:hover svg': {
        color: hoverColor ?? 'var(--contrast-color)',
    },
    height: `${size ?? 24}px`,
    width: `${size ?? 24}px`,
    cursor: disabled ? 'not-allowed' : 'pointer',
}))

const Container = styled.div(({ color, hoverColor, size }: { color?: string, hoverColor?: string, size?: number}) => ({
    'svg' : {
        color: color ?? 'var(--dynamic-color)',
    },
    height: `${size ?? 24}px`,
    width: `${size ?? 24}px`,
}))

type IconProps = {
    svg: string;
    onClick?: () => void;
    color?: string;
    hoverColor?: string;
    size?: number;
    disabled?: boolean;
}

export const Icon: React.FC<IconProps> = ({ svg, color, hoverColor, onClick, size, disabled = false}) => {

    if(onClick) {
        return (
            <ContainerButton onClick={() => disabled ? undefined : onClick()} color={color} hoverColor={hoverColor} size={size} disabled={disabled}>
                <ReactSVG src={svg} />
            </ContainerButton>
        )
    }
    return (
        <Container color={color} hoverColor={hoverColor} size={size}>
            <ReactSVG src={svg} />
        </Container>
    )
};
