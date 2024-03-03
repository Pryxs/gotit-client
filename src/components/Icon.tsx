import styled from '@emotion/styled'
import { ReactSVG } from 'react-svg'

const Container = styled.button(({ color, hoverColor, size }: { color?: string, hoverColor?: string, size?: number}) => ({
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
    return (
        <Container onClick={onClick} color={color} hoverColor={hoverColor} size={size}>
            <ReactSVG src={svg} />
        </Container>
    )
};
