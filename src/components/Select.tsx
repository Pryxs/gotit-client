import styled from "@emotion/styled"
import { useState } from "react"
import { Icon } from "./Icon"
import { arrow, close } from "assets"

const Container = styled.div({
    position: 'relative',
    fontSize: '14px',
})

const Selected = styled.button({
    padding: '6px 10px',
    borderRadius: '4px',
    outline: 'none',
    border: '2px solid var(--dark)',
    background: 'white',
    width: '100%',
    display: 'flex',
    flexWrap: 'wrap',   
    gap: '8px',
    rowGap: '4px',
    alignItems: 'center',
    '&:focus-visible'  : {
        borderColor: 'var(--contrast-color)',
    }
})

const Options = styled.ul(({isOpen} : {isOpen: boolean}) => ({
    display: isOpen ? 'block' : 'none',
    position:'absolute',
    boxSizing:'border-box',
    left: '0',
    width: '100%',
    listStyle: 'none',
    background: 'var(--white)',
    boxShadow: 'rgba(0, 0, 0, 0.08) 0px 4px 12px',
    padding: '12px',
}))

const EmptyPill = styled.div({
    color: 'var(--dynamic-color)',
})

const Pill = styled.div({
    background: 'var(--light)',
    padding: '4px 12px',
    borderRadius: '4px',
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
    fontSize: '12px',
})

const Option = styled.li(({isSelected} : {isSelected: boolean}) => ({
    padding: '4px 8px',
    borderRadius: '4px',
    marginBottom: '4px',
    cursor: 'pointer',
    ...(isSelected && {
        background: 'var(--dynamic-color)',
        color: 'var(--white)',
    }),
    '&:hover' : {
        background: isSelected ? '' : 'var(--light)',
    }
}))

type OptionTye = {
    id: string;
    name: string;
}

type SelectProps = {
    options: OptionTye[],
    selected: string[],
    setSelected: (ids : string[]) => void;
    placeholder: string;
}

export const Select:React.FC<SelectProps> = ({ options, selected, setSelected, placeholder }) => {
    const [isOpen, setIsOpen] = useState<boolean>(false)

    const isSelected = (id: string): boolean => selected.includes(id)

    const getOptionName = (id: string): string => options.find(option => option.id === id)?.name ?? 'unamed'

    const toggleOption = (id: string) => {
        if(isSelected(id)) {
        setSelected(selected.filter(e => e !== id))
        } else {
            setSelected([...selected, id])
        }
    }

    return (
        <Container>
            <Selected onClick={() => setIsOpen(prev => !prev)}>
                <Icon svg={arrow} />
            {!!selected.length ? selected.map(id => (
                <Pill>
                    <div>{getOptionName(id)}</div>
                    <Icon svg={close} onClick={() => toggleOption(id)} size={18}/>
                </Pill>
            )) : (
                <EmptyPill>{placeholder}</EmptyPill>
            )} 
            </Selected>
            <Options isOpen={isOpen}>
                {!!options.length && options.map(option => (
                    <Option 
                        key={option.id} 
                        onClick={() => toggleOption(option.id)} 
                        isSelected={isSelected(option.id)}
                    >
                        {option.name}
                    </Option>
                ))}
            </Options>
        </Container>
    )
}