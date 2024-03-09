import styled from "@emotion/styled"
import { Content } from "@tiptap/react"
import { Button, Input, Layout } from "components"
import { TiptapEditor } from "components"
import { useState } from "react"

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



export const Editor = () => {
    const [title, setTitle] = useState<string>('')
    const [content, setContent] = useState<Content>('')

    return(
        <Layout>
            <Container>
                <h2>Rédaction</h2>
                <VerticalSpacer />
                <Input label='Titre' value={title} onChange={setTitle} />
                <VerticalSpacer />
                <TiptapEditor content={content} onUpdate={setContent} />
                <ButtonWrapper>
                    <Button name='Publier' onClick={() => console.log(content)}/>
                </ButtonWrapper>
            </Container>
        </Layout>
    )
}