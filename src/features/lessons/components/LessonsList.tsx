import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import { getLessons, deleteLesson } from "../api";
import { ILesson } from "../types";
import { List } from 'components/List';
import { delete as deleteIcon } from 'assets'

type LessonlistType = Omit<ILesson, 'categories' |'author'>[]

const grid = 'minmax(150px, 1fr) minmax(100px, 1fr) minmax(100px, 1fr) 30px'

const Container = styled.div({
})

export const LessonsList = () => {
    const [lessons, setLessons] = useState<LessonlistType>([])

    const fetchData = async () => {
        const lessons = await getLessons()
        const lessonsList:LessonlistType = lessons.map(lesson => {
            const { categories, author, ...rest } = lesson;
            return {
                ...rest,
                author: author ?? 'inconnu'
            };
        })
        setLessons(lessonsList)
    }


    const invalidate = async (fn: () => void) => {
        await fn();
        fetchData();
    }

    const deleteOne = (id: string) => {
        // eslint-disable-next-line no-restricted-globals
        if (confirm('Voulez vous supprimer ce cours ?')) {
            invalidate(() => deleteLesson(id))
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
                <List items={lessons} exclude={['_id', 'categories', 'content', 'name', 'birthdate', 'firstName']} grid={grid} actions={actions} minWidth='600px'/>
            </Container>
    )
}