import styled from "@emotion/styled"
import { Button, Input, Layout } from "components"
import { useState } from "react"
import { useNavigate } from "react-router"
import { CategoriesSelector } from "features/categories"
import { LessonsSelector } from "features/lessons"
import { createModule } from "features/modules/api"

const Container = styled.div({
    padding: '24px',
    h2: {
        fontWeight: 'bold',
        fontSize: '24px',
    }
})

const ButtonWrapper = styled.div({
    width: '220px',
    margin: 'auto',
    marginTop: '20px',
})

const HeaderForm = styled.div({
    display: 'flex',
    gap: '16px',
    width: '100%',
    '&>div:first-child' :{
        flex: 1,
    }
})

const VerticalSpacer = styled.div({
    height: '24px',
})

const Label = styled.label({
    span : {
        marginLeft: '12px',
    }
})

export const Module = () => {
    const navigate = useNavigate()
    const [checked, setChecked] = useState(false);
    const [title, setTitle] = useState<string>('')
    const [level, setLevel] = useState<number>(1)
    const [lessons, setLessons] = useState<string[]>([])
    const [categories, setCategories] = useState<string[]>([])

    const publish = async() => {
        await createModule({ 
            title,
            level,
            lessons,
            categories,
            status: checked ? 'private' : 'public',
        })
        navigate('/')
    }

    return(
        <Layout>
            <Container>
                <h2>Module</h2>
                <VerticalSpacer />
                <HeaderForm>
                    <Input label='Titre' value={title} onChange={(e) => setTitle(e.target.value)} />
                    <Input label='Level' value={level} onChange={(e) => setLevel(e.target.value)} props={{type: 'number'}}/>
                </HeaderForm>
                <VerticalSpacer />
                <div>Catégories</div>
                <CategoriesSelector selectedCategories={categories} setSelectCategories={setCategories} />
                <VerticalSpacer />
                <div>Leçons</div>
                <LessonsSelector selectedLessons={lessons} setSelectLessons={setLessons} />
                <VerticalSpacer />
                <Label>
                    <input
                        type="checkbox"
                        checked={checked}
                        onChange={() => setChecked(!checked)}
                    />
                    <span>Rendre ce module privée</span>
                </Label>

                <ButtonWrapper>
                    <Button name='Publier' onClick={publish}/>
                </ButtonWrapper>
            </Container>
        </Layout>
    )
}