import styled from "@emotion/styled"
import { Layout } from "components"
import { useEffect, useState } from "react"
import { getLesson } from "features/lessons/api"
import { useAuth } from "hooks"
import { ILesson } from "features/lessons"
import { useParams } from "react-router"

const Container = styled.div({
    padding: '24px',
    h2: {
        fontWeight: 'bold',
        fontSize: '24px',
        marginTop: '16px',
        padding: '12px',
    }
})

const Preview = styled.div({
    border: 'none',
    height: 'auto',
})

const Infos = styled.div({
    display: 'flex',
    justifyContent: 'end',
    '&>strong' : {
        fontWeight: 'bold',
        marginLeft: '.5em',
    }
})


export const Lesson = () => {
    const { id } = useParams();

    const [lesson, setLesson] = useState<ILesson | null>(null)

    const fetchData = async () => {
        if(id) {
            const lesson = await getLesson(id)
            setLesson(lesson)
        }
    }

    useEffect(() => {
        fetchData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return(
        <Layout>
            <Container>
            {lesson && (
                <>
                    <h2>{lesson.title}</h2>
                    <Preview className='tiptap' dangerouslySetInnerHTML={{ __html: lesson.content }} />
                    <Infos>écrit par : <strong>{lesson.author.profile.name}  {lesson.author.profile.firstName}</strong></Infos>
                </>
            )}
            </Container>    
        </Layout>
    )
}