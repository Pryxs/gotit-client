import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import { getModules, deleteModule } from "../api";
import { IModule } from "../types";
import { List } from 'components/List';
import { delete as deleteIcon } from 'assets'

type ModulelistType = (Omit<IModule, 'categories' | 'lessons' | 'author'> & { lessons: number, author: string})[]

const grid = 'minmax(150px, 2fr) minmax(100px, 1fr) minmax(100px, 1fr) minmax(150px, 2fr) minmax(100px, 1fr) 30px'

const Container = styled.div({
})

export const ModulesList = () => {
    const [modules, setModules] = useState<ModulelistType>([])

    const fetchData = async () => {
        const modules = await getModules()
        const modulesList:ModulelistType = modules.map(module => {
            const { categories, author, lessons, ...rest } = module;
            return {
                ...rest,
                author: author?.username ?? 'inconnu',
                lessons: lessons.length,
            };
        })
        console.log(modulesList)
        setModules(modulesList)
    }


    const invalidate = async (fn: () => void) => {
        await fn();
        fetchData();
    }

    const deleteOne = (id: string) => {
        // eslint-disable-next-line no-restricted-globals
        if (confirm('Voulez vous supprimer ce module ?')) {
            invalidate(() => deleteModule(id))
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
                <List items={modules} exclude={['_id']} grid={grid} actions={actions} minWidth='700px'/>
            </Container>
    )
}