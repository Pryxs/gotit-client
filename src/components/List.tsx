import styled from '@emotion/styled'
import { CSSProperties } from 'react';
import { getAllKeys } from 'utils/helpers';
import { Icon } from './Icon';

type RowGridProps = {
    isPair?: boolean, 
    grid: CSSProperties['gridTemplateColumns'],
    minWidth:  CSSProperties['width']
}

const Container = styled.div(({ color, hoverColor }: { color?: string, hoverColor?: string}) => ({
    width: '100%',
    overflowX: 'auto',
    boxShadow: 'rgba(0, 0, 0, 0.05) 0px 1px 2px 0px',
}))

const Header = styled.div(({ grid, minWidth }: RowGridProps) => ({
    display: 'grid',
    gridTemplateColumns: grid,
    background: 'var(--light)',
    padding: '8px 16px',
    minWidth,
    fontWeight: 'bold',
    'div' : {
        textAlign: 'left',
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
        padding: '3px 6px',
    }
}))

const RowGrid = styled.div(({ isPair, grid, minWidth }: RowGridProps) => ({
    display: 'grid',
    gridTemplateColumns: grid,
    padding: '8px 16px',
    minWidth,
    ...(isPair && {
        background: 'var(--light)',
    }),
    '&>div' : {
        textAlign: 'left',
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
        padding: '3px 6px',
    },
    'svg': {
        height: '16px',
        width: '16px',
    }
}))

const ActionWrapper = styled.div({
    
})

type ActionType = {
    name: string;
    icon: string;
    onClick: (id: string) => void;
}
type ListProps = {
    items: Record<string, any>[];
    actions: ActionType[];
    exclude?: string[];
    grid: CSSProperties['gridTemplateColumns'];
    minWidth: CSSProperties['width'];
}

type RowProps = {
    item: Record<string, any>;
    index: number;
    exclude?: string[];
    actions: ActionType[];
    grid: CSSProperties['gridTemplateColumns'];
    minWidth: CSSProperties['width'];
    isPair: boolean;
}

const Row = ({item, index, exclude, grid, actions, minWidth, isPair}: RowProps) => (
    <RowGrid isPair={isPair} grid={grid} minWidth={minWidth}>
        {Object.keys(item).map(key => (
            !exclude?.includes(key) &&
            <div key={index + key}>{item[key]}</div>
        ))}
        {actions.map(action => (
            <ActionWrapper key={action.name}>
                <Icon svg={action.icon} onClick={() => action.onClick(item._id)} size={16} color='var(--dark)'/>
            </ActionWrapper>
        ))} 
    </RowGrid>
    )

export const List = ({ items, actions, exclude, grid, minWidth }: ListProps) => {
    const headers = getAllKeys(items[0]).filter(e => !exclude?.includes(e)).filter(e => isNaN(parseInt(e)))

    // TODO : refactor logic (add recursion)
    return (    
        <Container>
            <Header grid={grid} minWidth={minWidth}>
            {headers.map((header, index) => (
                <div key={index}>{header}</div>
            ))}
            </Header>
            {items.map((item, index) => (
                <Row key={item._id} item={item} index={item._id} grid={grid} exclude={exclude} actions={actions} minWidth={minWidth} isPair={!!(index % 2)}/>
            ))}       
        </Container>
    )
};

