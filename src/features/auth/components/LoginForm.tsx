import { Input, Button } from "components";
import { useState } from "react";
import { login, LoginCredentials } from "../api";

export const LoginForm: React.FC = () => {
    const [email, setEmail] = useState<string>('admin@gmail.com');
    const [password, setPassword] = useState<string>('');
    
    const submitLoginForm = async() => {
        const data: LoginCredentials = {email, password}
        login(data);
    }

    return <div>
        <Input value={email} onChange={e => setEmail(e.target.value)} props={{type: 'email', name: 'username'}}/> 
        <Input value={password} onChange={e => setPassword(e.target.value)} props={{type: 'password', name: 'password'}}/> 
        <Button name='Se connecter' onClick={submitLoginForm} />
    </div>;
};
