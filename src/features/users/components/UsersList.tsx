import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import { getUsers, deleteUser, createUser } from "../api";
import { IUser } from "../types";
import { List } from 'components/List';
import { delete as deleteIcon } from 'assets'
import { Button, Input } from "components";
import { Modal } from "components";

const grid = 'minmax(100px, 2fr) minmax(100px, 2fr) minmax(100px, 2fr)  minmax(70px, 2fr)  minmax(70px, 2fr)  minmax(70px, 2fr) 50px'

const Container = styled.div({
})

const ButtonWrapper = styled.div({
    width: '300px',
    margin: 'auto',
    marginTop: '32px',
})

const FormContainer = styled.div({
    h2: {
        fontWeight: 'bold',
        margin: '8px 0',
    },
    '.field' : {
        margin: '8px 0',
        width: '100%',
    },
    button: {
        marginTop: '24px',
    }
})

const FormRow = styled.div({
    display: 'flex',
    gap: '16px',
    '@media (max-width: 550px)': {
        flexDirection: 'column',
        gap: 0,
    }
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
    const [creationForm, setCreationform] = useState<IUser>(baseForm)
    const [isOpen, setisOpen] = useState<boolean>(false)

    const fetchData = async () => {
        const users = await getUsers()
        setUsers(users)
    }

    const invalidateAction = async (fn: () => void) => {
        await fn();
        fetchData();
    }

    const deleteOne = (id: string) => invalidateAction(() =>deleteUser(id))

    const createOne = (formData: IUser) => invalidateAction(() =>createUser(formData))

    const actions = [{
        name: 'supprimer',
        icon: deleteIcon,
        onClick: deleteOne,
    }]

    const handleCreationFormChange = (e: any) => {
        const name = e.target.getAttribute('name');
        const { value } = e.target;
        if (name && name.includes('.')) {
            const [parent, child] = name.split('.');
            if(parent === 'profile') {
                const profile = creationForm.profile
            setCreationform({
                ...creationForm,
                [parent]: {
                    ...profile,
                    [child]: value
                }
            });
        }
        } else {
            setCreationform({...creationForm, [name]: value });
        }
    }

    useEffect(() => {
        fetchData()
    }, [])

    return(
            <Container>
                <List items={users} exclude={['_id', 'profile']} grid={grid} actions={actions} minWidth='600px'/>

                <ButtonWrapper>
                    <Button importance="secondary" name='Ajouter un utilisateur' onClick={() => setisOpen(true)}/>
                </ButtonWrapper>

                <Modal isOpen={isOpen} setIsOpen={setisOpen} title='Ajouter un utilisateur'>
                    <FormContainer>
                        <h2>Informations de compte</h2>
                        <Input label="Nom d'utilisateur" value={creationForm.username} onChange={(e) => handleCreationFormChange(e)} props={{name: 'username'}}/>
                        <FormRow>
                            <Input label="Email" value={creationForm.email} onChange={(e) => handleCreationFormChange(e)} props={{name: 'email'}} />
                            <Input label="Role" value={creationForm.role} onChange={(e) => handleCreationFormChange(e)} props={{name: 'role'}}/>
                            </FormRow>
                        <Input label="Mot de passe" value={creationForm.password} onChange={(e) => handleCreationFormChange(e)} props={{name: 'password'}} />
                        <h2>Profile</h2>
                        <FormRow>
                            <Input label="Prénom" value={creationForm.profile.firstName} onChange={(e) => handleCreationFormChange(e)} props={{name: 'profile.firstName'}}/>
                            <Input label="Nom" value={creationForm.profile.name} onChange={(e) => handleCreationFormChange(e)}  props={{name: 'profile.name'}}/>
                        </FormRow>
                        <Input label="Date de naissance" value={creationForm.profile.birthdate} onChange={(e) => handleCreationFormChange(e)}  props={{name: 'profile.birthdate', type: 'date'}} />
                        <Button name='Créer' onClick={() => createOne(creationForm)} />
                    </FormContainer>
                </Modal>
            </Container>
    )
}