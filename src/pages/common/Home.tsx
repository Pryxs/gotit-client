import { Input, Layout } from "components";
import { useEffect, useState } from "react";
import type { ILesson } from "features/lessons";
import { getLessons } from "features/lessons/api";
import { useAuth } from "hooks";
import { LessonCard } from 'features/lessons'
import _ from 'lodash';
import styled from "@emotion/styled";
import { IModule } from "features/modules";
import { getModules } from "features/modules/api";
import { ModuleCard } from 'features/modules';

const Container = styled.div({
    padding: '24px',
    h2: {
        fontWeight: 'bold',
        fontSize: '24px',
        marginTop: '16px',
    }
})

const ModulesContainer = styled.div({
    display: 'flex',
    gap: '16px',
    marginTop: '16px',
})

const LessonsGrid = styled.div({
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(400px, auto))',
    gap: '16px',
    marginTop: '16px',
    '@media (max-width: 550px)': {
        gridTemplateColumns: '1fr',
    }
})

export const Home = () => {
    const { role } = useAuth();
    const [lessons, setLessons] = useState<(ILesson & { _id: string})[]>([])
    const [modules, setModules] = useState<IModule[]>([])

    const debouncedSearch = _.debounce((value) => {
        fetchData(value)
    }, 200)

    const fetchData = async (search?: string) => {
        const lessons = await getLessons({ 
            q: search,
            status: role === 'guest' ? 'public' : 'private',
        })
        const modules = await getModules({ 
            q: search,
            status: role === 'guest' ? 'public' : 'private',
        })
        setLessons(lessons)
        setModules(modules)

    }

    useEffect(() => {
        fetchData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return(
        <Layout>
            <Container>
                <Input onChange={(e) => debouncedSearch(e.target.value)} props={{ placeholder: 'rechercher...'}} />
                <h2>Modules</h2>
                <ModulesContainer>
                    {modules.length ? modules.map(module => (
                            <ModuleCard key={module.title} {...module} />
                        )) : (
                        <div>Aucun résultat</div>
                    )}
                </ModulesContainer>
                <h2>Leçons</h2>
                <LessonsGrid>
                    {lessons.length ? lessons.map(lesson => (
                        <LessonCard key={lesson.title} {...lesson} id={lesson._id} />
                    )) : (
                        <div>Aucun résultat</div>
                    )}
                </LessonsGrid>
            </Container>
        </Layout>
    )
}