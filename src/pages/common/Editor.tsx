import styled from "@emotion/styled"
import { Content } from "@tiptap/react"
import { Button, Input, Layout } from "components"
import { TiptapEditor } from "components"
import { useState } from "react"
import { createLesson } from "features/lessons/api"
import { useNavigate } from "react-router"

const Container = styled.div({
    padding: '24px',
    h2: {
        fontWeight: 'bold',
        fontSize: '24px',
        marginTop: '16px',
    }
})

const ButtonWrapper = styled.div({
    width: '220px',
    margin: 'auto',
    marginTop: '20px',
})

const VerticalSpacer = styled.div({
    height: '24px',
})

const Label = styled.label({
    span : {
        marginLeft: '12px',
    }
})



export const Editor = () => {
    const navigate = useNavigate()
    const [checked, setChecked] = useState(false);
    const [title, setTitle] = useState<string>('')
    const [content, setContent] = useState<Content>('')

    const publish = async() => {
        if(typeof content === 'string') {
            await createLesson({ 
                title, 
                content, 
                status: checked ? 'private' : 'public', 
                categories: []
            })
        }
        navigate('/')
    }

    return(
        <Layout>
            <Container>
                <h2>Rédaction</h2>
                <VerticalSpacer />
                <Input label='Titre' value={title} onChange={(e) => setTitle(e.target.value)} />
                <VerticalSpacer />
                <TiptapEditor content={content} onUpdate={setContent} />
                <VerticalSpacer />
                <Label>
                    <input
                        type="checkbox"
                        checked={checked}
                        onChange={() => setChecked(!checked)}
                    />
                    <span>Rendre cette leçon privée</span>
                </Label>

                <ButtonWrapper>
                    <Button name='Publier' onClick={publish}/>
                </ButtonWrapper>
            </Container>
        </Layout>
    )
}