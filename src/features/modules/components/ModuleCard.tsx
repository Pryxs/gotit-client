import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import { getModules, deleteModule } from "../api";
import { IModule } from "../types";
import { List } from 'components/List';


const Container = styled.div({
    padding: '20px',
    borderRadius: '4px',
    boxShadow: 'rgba(0, 0, 0, 0.08) 0px 4px 12px',
    border: '1px solid transparent',
    width: '100%',
    h3 : {
        fontWeight: 'bold',
        fontSize: '18px',
        marginBottom: '8px',
    },
})

const Categories = styled.div({
    display: 'flex',
    gap: '8px',
})

const Category = styled.div({
    fontStyle: 'italic',
})

const Lessons = styled.div({
    strong: {
        fontWeight: 'bold',
    }
})

const Lesson = styled.a({
    color: 'var(--dynamic-color)',
    textDecoration: 'underline',
    cursor: 'pointer',
    '&:hover' : {
        color: 'var(--contrast-color)',
    }
})

const Footer = styled.div({
    marginTop: '12px',
    borderTop: '1px solid var(--light)',
    paddingTop: '12px',
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
})

export const ModuleCard:React.FC<IModule> = ({ title, author, level, lessons, categories, status}) => {

    return(
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
                <div>Niveau : {level}</div>
                <Lessons>
                    <div>Lessons(<strong>{lessons.length}</strong>)</div>
                    {lessons.map(lesson => (
                        <Lesson key={lesson.title}>
                            {lesson.title}
                        </Lesson>
                    ))}
                </Lessons>
                <Footer>
                    <div>
                        Par : {author.username}
                    </div>
                    <div>
                        {status}
                    </div>
                </Footer>            </Container>
    )
}