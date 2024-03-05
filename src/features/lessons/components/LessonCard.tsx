import styled from '@emotion/styled'
import { ILesson } from '../types';

const Container = styled.div({
    padding: '20px',
    borderRadius: '4px',
    boxShadow: 'rgba(0, 0, 0, 0.08) 0px 4px 12px',
    cursor: 'pointer',
    border: '1px solid transparent',
    h3 : {
        fontWeight: 'bold',
        fontSize: '18px',
        marginBottom: '8px',
    },
    '&:hover' : {
        borderColor: 'var(--contrast-color)',
    }
})

const Categories = styled.div({
    display: 'flex',
    gap: '8px',
})

const Category = styled.div({
    fontStyle: 'italic',
})

const Footer = styled.div({
    marginTop: '12px',
    borderTop: '1px solid var(--light)',
    paddingTop: '12px',
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
})

export const LessonCard: React.FC<ILesson> = ({ title, content, status, categories, author }) => {

    return (
            <Container>
                <h3>{title}</h3>
                <Categories>
                    <p>Catégories : </p>
                    {categories.length ? 
                        categories.map(category => (
                        <Category key={category.name}>{category.name}</Category>
                    )): (
                        <p>aucune</p>
                    )}
                </Categories>
                <Footer>
                    <div>
                        Par : {author.username}
                    </div>
                    <div>
                        {status}
                    </div>
                </Footer>
            </Container>        
    )
};
