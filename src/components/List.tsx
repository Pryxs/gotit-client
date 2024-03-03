import styled from '@emotion/styled'
import { CSSProperties } from 'react';
import { getAllKeys } from 'utils/helpers';
import { Icon } from './Icon';

const Container = styled.button(({ color, hoverColor }: { color?: string, hoverColor?: string}) => ({
    width: '100%',
    overflowX: 'auto',
}))

const Header = styled.div(({ grid }: { grid: CSSProperties['gridTemplateColumns']}) => ({
    display: 'grid',
    gridTemplateColumns: grid,
    background: 'var(--light)',
    padding: '8px 16px',
    'div' : {
        textAlign: 'left',
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
        padding: '3px 6px',
    }
}))

const RowGrid = styled.div(({ isPair, grid }: { isPair: boolean, grid: CSSProperties['gridTemplateColumns']}) => ({
    display: 'grid',
    gridTemplateColumns: grid,
    padding: '8px 16px',
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

const ActionWrapper = styled.button({
    
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
}

type RowProps = {
    item: Record<string, any>;
    index: number;
    exclude?: string[];
    actions: ActionType[];
    grid: CSSProperties['gridTemplateColumns'];
}

const Row = ({item, index, exclude, grid, actions}: RowProps) => (
    <RowGrid isPair={!!(index % 2)} grid={grid}>
        {Object.keys(item).map(key => (
            typeof item[key] === 'object' ? (
                Object.keys(item[key]).map(keyBis => (
                    !exclude?.includes(keyBis) && 
                    <div key={keyBis + index}>{item[key][keyBis]}</div>
                ))
            ) : (
                !exclude?.includes(key) &&
                <div key={key + index}>{item[key]}</div>
            )
        ))}
        {actions.map(action => (
            <ActionWrapper>
                <Icon svg={action.icon} onClick={() => action.onClick(item._id)} size={16} />
            </ActionWrapper>
        ))}
    </RowGrid>
    )

export const List = ({ items, actions, exclude, grid }: ListProps) => {
    const headers = getAllKeys(items[0]).filter(e => !exclude?.includes(e))


    // TODO : refactor logic (add recursion)
    return (
        <Container>
            <Header grid={grid}>
            {headers.map((header, index) => (
                <div key={index}>{header}</div>
            ))}
            </Header>
            {items.map((item, index) => (
                <Row key={index} item={item} index={index} grid={grid} exclude={exclude} actions={actions}/>
            ))}       
        </Container>
    )
};

