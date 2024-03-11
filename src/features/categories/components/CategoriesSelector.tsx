import { useEffect, useState } from "react";
import { ICategory } from "features/categories";
import { getCategories } from "features/categories/api";
import styled from "@emotion/styled";

const Select  = styled.select({
    '-webkit-appearance': 'none',
    padding: '7px 40px 7px 12px',
    width: '100%',
    height: '4.2em',
    border: '1px solid #E8EAED',
    borderRadius: '4px',
    background: 'white',
    boxShadow: '0 1px 3px -2px #9098A9',
    cursor: 'pointer',
    fontSize: '16px',
    transition: 'all 150ms ease'
})

type SelectorProps = {
    selectedCategories: string[];
    setSelectCategories: (categories: string[]) => void 
}

export const CategoriesSelector:React.FC<SelectorProps> = ({selectedCategories, setSelectCategories}) => {
    const [categories, setCategories] = useState<(ICategory & { _id: string})[]>([])

    const handleSelectChange = (e:  React.ChangeEvent<HTMLSelectElement>) => {
        const { value } = e.target;
        if(selectedCategories.includes(value)) {
            setSelectCategories(selectedCategories.filter(e => e !== value))
        } else {
            setSelectCategories([...selectedCategories, value])
        }
    }

    const fetchData = async () => {
        const categories = await getCategories()
        setCategories(categories)
    }

    useEffect(() => {
        fetchData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedCategories])

    return(
        <Select 
            value={selectedCategories}
            onChange={e => handleSelectChange(e)}
            multiple
        >
            {categories && categories.map(category => (
                <option key={category._id} value={category._id}>{category.name}</option>
            ))}
        </Select>
    )
}