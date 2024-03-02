import { Input, Button } from "components";
import { useState } from "react";
import { login, LoginCredentials } from "../api";
import styled from '@emotion/styled'
import { useNavigate } from 'react-router-dom';

const Container = styled.div({
    width:'100%',
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '-15vh',
})

const FormWrapper = styled.div({
    padding: '16px',
    width:'350px',
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
    '& button': {
        marginTop: '12px',
    }
})

export const LoginForm: React.FC = () => {
    const navigate = useNavigate();

    const [email, setEmail] = useState<string>('admin@gmail.com');
    const [password, setPassword] = useState<string>('testtest');
    
    const submitLoginForm = async() => {
        const data: LoginCredentials = {email, password}
        const isLogged = await login(data);
        if(isLogged) navigate("/")
    }

    return <Container>
        <FormWrapper>
            <Input value={email} onChange={e => setEmail(e.target.value)} props={{type: 'email', name: 'username'}}/> 
            <Input value={password} onChange={e => setPassword(e.target.value)} props={{type: 'password', name: 'password'}}/> 
            <Button name='Se connecter' onClick={submitLoginForm} />
        </FormWrapper>
    </Container>;
};
