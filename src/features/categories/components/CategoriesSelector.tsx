import { useEffect, useState } from "react";
import { ICategory } from "features/categories";
import { getCategories } from "features/categories/api";
import { Select } from "components";

type SelectorProps = {
    selectedCategories: string[];
    setSelectCategories: (categories: string[]) => void 
}

export const CategoriesSelector:React.FC<SelectorProps> = ({selectedCategories, setSelectCategories}) => {
    const [categories, setCategories] = useState<(ICategory & { id: string})[]>([])

    const fetchData = async () => {
        const categories = await getCategories()
        setCategories(categories.map(category => ({id: category._id, name: category.name})))
    }

    useEffect(() => {
        fetchData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedCategories])

    return(
        <Select 
            options={categories} 
            selected={selectedCategories} 
            setSelected={setSelectCategories} 
            placeholder='Sélectionner une catégorie'
        />
    )
}