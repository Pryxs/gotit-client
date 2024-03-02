import storage from "utils/storage"
import { decodeToken } from "react-jwt";
import type { TokenType } from "types";
import { useState } from "react";

export const useAuth = () => {
    const [role, setRole] = useState('guest');
    const [email, setEmail] = useState('');

    const token = storage.getToken();

    if(token) {
        const decoedToken = decodeToken(token) as TokenType;
        if(decoedToken.role !== role) {
            setRole(decoedToken.role);
            setEmail(decoedToken.email);
        }
    }
    
    const clear = () => {
        storage.clearToken();
        setRole('guest');
    };

    return {role, email, clear};
}