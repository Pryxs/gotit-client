import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import { getCategories, deleteCategory } from "../api";
import { ICategory } from "../types";
import { List } from 'components/List';
import { delete as deleteIcon } from 'assets'
import { Button } from "components";
import { CreateCategoryModal } from "./CreateCategoryModal";

const grid = 'minmax(250px, 1fr) 30px'

const Container = styled.div({
})

const ButtonWrapper = styled.div({
    width: '300px',
    margin: 'auto',
    marginTop: '32px',
})


export const CategoriesList = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const [categories, setCategories] = useState<ICategory[]>([])

    const fetchData = async () => {
        const categories = await getCategories()
        setCategories(categories)
    }

    const invalidate = async (fn: () => void) => {
        await fn();
        fetchData();
    }

    const deleteOne = (id: string) => {
        // eslint-disable-next-line no-restricted-globals
        if (confirm('Voulez vous supprimer cette categorie ?')) {
            invalidate(() => deleteCategory(id))
        }
    }

    const actions = [{
        name: 'supprimer',
        icon: deleteIcon,
        onClick: deleteOne,
    }]


    useEffect(() => {
        fetchData()
    }, [])

    return(
            <Container>
                <List items={categories} exclude={['_id']} grid={grid} actions={actions} minWidth='400px'/>
                
                <ButtonWrapper>
                    <Button importance="secondary" name='Ajouter une  catégorie' onClick={() => setIsOpen(true)}/>
                </ButtonWrapper>

                <CreateCategoryModal isOpen={isOpen} setIsOpen={setIsOpen} invalidate={invalidate}/>
            </Container>
    )
}