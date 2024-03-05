import styled from "@emotion/styled";
import { useState } from "react";
import { createCategory } from "../api";
import { ICategory } from "../types";
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

const baseForm: ICategory = {
    name: '',
}

type CreateUserModalProps = {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
    invalidate: (fn: () => void) => void;
}

export const CreateCategoryModal:React.FC<CreateUserModalProps> = ({ isOpen, setIsOpen, invalidate }) => {
    const [creationForm, setCreationform] = useState<ICategory>(baseForm)

    const createOne = (formData: ICategory) => {
        invalidate(async() => { 
            await createCategory(formData);
            setIsOpen(false);
        })
    } 

    return(
        <Modal isOpen={isOpen} setIsOpen={setIsOpen} title='Ajouter un utilisateur'>
            <FormContainer>
                <Input label="Nom de la catégorie" value={creationForm.name} onChange={(e) => setCreationform({ name: e.target.value})}/>
                <Button name='Créer' onClick={() => createOne(creationForm)} />
            </FormContainer>
        </Modal>
    )
}