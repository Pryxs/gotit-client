import styled from "@emotion/styled";
import { useState } from "react";
import { createUser } from "../api";
import { IUser } from "../types";
import { Button, Input } from "components";
import { Modal } from "components";


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

type CreateUserModalProps = {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
    invalidate: (fn: () => void) => void;
}

export const CreateUserModal:React.FC<CreateUserModalProps> = ({ isOpen, setIsOpen, invalidate }) => {
    const [creationForm, setCreationform] = useState<IUser>(baseForm)

    const createOne = (formData: IUser) => {
        invalidate(async() => { 
            await createUser(formData);
            setIsOpen(false);
        })
    } 

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
    return(
        <Modal isOpen={isOpen} setIsOpen={setIsOpen} title='Ajouter un utilisateur'>
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
    )
}