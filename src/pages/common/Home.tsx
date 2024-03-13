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
import { CategoriesSelector } from "features/categories";

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

const Header = styled.div({
    display: 'flex',
    gap: '12px',
    width: '100%',
    '&>div:first-child' : {
        flex: 3,
    },
    '&>div:nth-child(2)' : {
        flex: 1,
    }
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
    const [selectedCategories, setSelectCategories] = useState<string[]>([]);
    const [search, setSearch] = useState<string>('')

    const debouncedSearch = _.debounce((value) => {
        setSearch(value)
    }, 200)

    const fetchData = async () => {
        const lessons = await getLessons({ 
            q: search,
            status: role === 'guest' ? 'public' : 'private',
            ...(selectedCategories.length && {
                categories: selectedCategories.join(',')
            })
        })
        const modules = await getModules({ 
            q: search,
            status: role === 'guest' ? 'public' : 'private',
            ...(selectedCategories.length && {
                categories: selectedCategories.join(',')
            })
        })
        setLessons(lessons)
        setModules(modules)
    }

    useEffect(() => {
        fetchData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedCategories, search])

    return(
        <Layout>
            <Container>
                <Header>
                    <Input onChange={(e) => debouncedSearch(e.target.value)} props={{ placeholder: 'rechercher...'}} />
                    <CategoriesSelector selectedCategories={selectedCategories} setSelectCategories={setSelectCategories} />
                </Header>
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