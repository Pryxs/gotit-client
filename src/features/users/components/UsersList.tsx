import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import { getUsers, deleteUser, getUser } from "../api";
import { IUser } from "../types";
import { List } from 'components/List';
import { delete as deleteIcon } from 'assets'
import { edit } from 'assets'
import { Button } from "components";
import { CreateUserModal } from "./CreateUserModal";
import { UpdateUserModal } from "./UpdateUserModal";

const grid = 'minmax(100px, 2fr) minmax(100px, 2fr) minmax(100px, 2fr)  minmax(70px, 2fr)  minmax(70px, 2fr)  minmax(70px, 2fr) 30px 30px'

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
    const [users, setUsers] = useState<Omit<IUser, 'profile'>[]>([])
    const [isOpenCreation, setIsOpenCreation] = useState<boolean>(false)
    const [isOpenEdition, setIsOpenEdition] = useState<boolean>(false)
    const [updateForm, setUpdateForm] = useState<Omit<IUser, 'password'>>(baseForm)
    const [id, setId] = useState<string | null>(null)

    const fetchData = async () => {
        const users = await getUsers()
        const usersList:Omit<IUser, 'profile'>[] = users.map(user => {
            const { profile, ...rest } = user;
            return {
                ...profile,
                ...rest,
            };
        })
        setUsers(usersList)
    }

    const invalidate = async (fn: () => void) => {
        await fn();
        fetchData();
    }

    const deleteOne = (id: string) => {
        // eslint-disable-next-line no-restricted-globals
        if (confirm('Voulez vous supprimer cet utilisateur ?')) {
            invalidate(() => deleteUser(id))
        }
    }

    const openEdition = async(id: string) => {
        const user = await getUser(id);
        setId(id)
        setUpdateForm({...user})
        setIsOpenEdition(true)
    }

    const actions = [{
        name: 'modifier',
        icon: edit,
        onClick: openEdition,
    },{
        name: 'supprimer',
        icon: deleteIcon,
        onClick: deleteOne,
    }]

    useEffect(() => {
        fetchData()
    }, [])

    return(
            <Container>
                <List items={users} exclude={['_id']} grid={grid} actions={actions} minWidth='600px'/>

                <ButtonWrapper>
                    <Button importance="secondary" name='Ajouter un utilisateur' onClick={() => setIsOpenCreation(true)}/>
                </ButtonWrapper>

                <CreateUserModal isOpen={isOpenCreation} setIsOpen={setIsOpenCreation} invalidate={invalidate}/>

                <UpdateUserModal isOpen={isOpenEdition} setIsOpen={setIsOpenEdition} invalidate={invalidate} form={updateForm} setForm={setUpdateForm} id={id} setId={setId}/>
            </Container>
    )
}