import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import { getUsers, deleteUser, createUser, getUser } from "../api";
import { IUser } from "../types";
import { List } from 'components/List';
import { delete as deleteIcon } from 'assets'
import { edit } from 'assets'
import { Button } from "components";
import { CreateUserModal } from "./CreateUserModal";

const grid = 'minmax(100px, 2fr) minmax(100px, 2fr) minmax(100px, 2fr)  minmax(70px, 2fr)  minmax(70px, 2fr)  minmax(70px, 2fr) 50px'

const Container = styled.div({
})

const ButtonWrapper = styled.div({
    width: '300px',
    margin: 'auto',
    marginTop: '32px',
})

const baseForm: IUser = {
    username: 'Jeannot25',
    email: 'jean@dupont.fr',
    password: 'testtest',
    role: 'user',
    profile: {
        firstName: 'Jean',
        name: 'Dupont',
        birthdate: '',
    }
}


export const UsersList = () => {
    const [users, setUsers] = useState<IUser[]>([])
    const [isOpenCreation, setIsOpenCreation] = useState<boolean>(false)

    const fetchData = async () => {
        const users = await getUsers()
        setUsers(users)
    }

    const invalidate = async (fn: () => void) => {
        await fn();
        fetchData();
    }

    const deleteOne = (id: string) => invalidate(() =>deleteUser(id))

    const openEdition = async(id: string) => {
        // const user = await getUser(id);
        // setUpdateform({...user})
        // setIsOpenEdition(true)
    }

    const actions = [{
        name: 'supprimer',
        icon: deleteIcon,
        onClick: deleteOne,
    }, {
        name: 'modifier',
        icon: edit,
        onClick: openEdition,
    }]


    useEffect(() => {
        fetchData()
    }, [])

    return(
            <Container>
                <List items={users} exclude={['_id', 'profile']} grid={grid} actions={actions} minWidth='600px'/>

                <ButtonWrapper>
                    <Button importance="secondary" name='Ajouter un utilisateur' onClick={() => setIsOpenCreation(true)}/>
                </ButtonWrapper>

                <CreateUserModal isOpen={isOpenCreation} setIsOpen={setIsOpenCreation} invalidate={invalidate}/>
            </Container>
    )
}