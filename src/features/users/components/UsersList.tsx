import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import { getUsers } from "../api";
import { IUser } from "../types";
import { List } from 'components/List';
import { delete as deleteIcon } from 'assets'


const grid = 'minmax(100px, 2fr) minmax(100px, 2fr) minmax(100px, 2fr)  minmax(70px, 2fr)  minmax(70px, 2fr)  minmax(70px, 2fr) 50px'

const Container = styled.div({
    
})


export const UsersList = () => {
    const [users, setUsers] = useState<IUser[]>([])

    const fetchData = async () => {
        const users = await getUsers()
        setUsers(users)
    }

    const deleteOne = (id: string) => {
        alert("delete " + id)
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
                <List items={users} exclude={['_id', 'profile']} grid={grid} actions={actions}/>
            </Container>
    )
}