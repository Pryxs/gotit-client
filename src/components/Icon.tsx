import styled from '@emotion/styled'
import { ReactSVG } from 'react-svg'

const Container = styled.button(({ color, hoverColor }: { color?: string, hoverColor?: string}) => ({
    height: '24px',
    width: '24px',
    'svg' : {
        color: color ?? 'var(--dynamic-color)',
    },
    '&:hover svg': {
        color: hoverColor ?? 'var(--contrast-color)',
    }
}))

type IconProps = {
    svg: string;
    onClick?: () => void;
    color?: string;
    hoverColor?: string;
}

export const Icon: React.FC<IconProps> = ({ svg, color, hoverColor, onClick}) => {
    return (
        <Container onClick={onClick} color={color} hoverColor={hoverColor}>
            <ReactSVG src={svg} />
        </Container>
    )
};
