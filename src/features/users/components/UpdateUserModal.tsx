import styled from "@emotion/styled";
import { updateUser } from "../api";
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

type CreateUserModalProps = {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
    invalidate: (fn: () => void) => void;
    form: Omit<IUser, 'password'>,
    setForm: (data: Omit<IUser, 'password'>) => void;
    id: string | null;
    setId: (id: string | null) => void;
}

export const UpdateUserModal:React.FC<CreateUserModalProps> = ({ isOpen, setIsOpen, invalidate, form, setForm, id, setId }) => {
    const updateOne = (formData:  Omit<IUser, 'password'>) => {
        if(id) {
            invalidate(async() => { 
                await updateUser({id, formData})
                setId(null);
                setIsOpen(false);
            })
        }
    } 

    const handleformChange = (e: any) => {
        const name = e.target.getAttribute('name');
        const { value } = e.target;
        if (name && name.includes('.')) {
            const [parent, child] = name.split('.');
            if(parent === 'profile') {
                const profile = form.profile
            setForm({
                ...form,
                [parent]: {
                    ...profile,
                    [child]: value
                }
            });
        }
        } else {
            setForm({...form, [name]: value });
        }
    }
    return(
        <Modal isOpen={isOpen} setIsOpen={setIsOpen} title='Modifier un utilisateur'>
            <FormContainer>
                <h2>Informations de compte</h2>
                <Input label="Nom d'utilisateur" value={form.username} onChange={(e) => handleformChange(e)} props={{name: 'username'}}/>
                <FormRow>
                    <Input label="Email" value={form.email} onChange={(e) => handleformChange(e)} props={{name: 'email'}} />
                    <Input label="Role" value={form.role} onChange={(e) => handleformChange(e)} props={{name: 'role'}}/>
                    </FormRow>
                <h2>Profile</h2>
                <FormRow>
                    <Input label="Prénom" value={form.profile.firstName} onChange={(e) => handleformChange(e)} props={{name: 'profile.firstName'}}/>
                    <Input label="Nom" value={form.profile.name} onChange={(e) => handleformChange(e)}  props={{name: 'profile.name'}}/>
                </FormRow>
                <Input label="Date de naissance" value={form.profile.birthdate} onChange={(e) => handleformChange(e)}  props={{name: 'profile.birthdate', type: 'date'}} />
                <Button name='Modifier' onClick={() => updateOne(form)} />
            </FormContainer>
        </Modal>
    )
}