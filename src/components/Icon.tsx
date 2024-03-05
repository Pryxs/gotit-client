import styled from '@emotion/styled'
import { ReactSVG } from 'react-svg'

const ContainerButton = styled.button(({ color, hoverColor, size }: { color?: string, hoverColor?: string, size?: number}) => ({
    'svg' : {
        color: color ?? 'var(--dynamic-color)',
    },
    '&:hover svg': {
        color: hoverColor ?? 'var(--contrast-color)',
    },
    height: `${size ?? 24}px`,
    width: `${size ?? 24}px`,
}))

const Container = styled.div(({ color, hoverColor, size }: { color?: string, hoverColor?: string, size?: number}) => ({
    'svg' : {
        color: color ?? 'var(--dynamic-color)',
    },
    '&:hover svg': {
        color: hoverColor ?? 'var(--contrast-color)',
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
}

export const Icon: React.FC<IconProps> = ({ svg, color, hoverColor, onClick, size}) => {

    if(onClick) {
        return (
            <ContainerButton onClick={onClick} color={color} hoverColor={hoverColor} size={size}>
                <ReactSVG src={svg} />
            </ContainerButton>
        )
    }
    return (
        <Container onClick={onClick} color={color} hoverColor={hoverColor} size={size}>
            <ReactSVG src={svg} />
        </Container>
    )
};
