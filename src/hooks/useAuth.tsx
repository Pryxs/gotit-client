import storage from "utils/storage"
import { decodeToken } from "react-jwt";
import type { RoleType, TokenType } from "types";
import { useState } from "react";

export const useAuth = () => {
    const [role, setRole] = useState<RoleType>('guest');
    const [email, setEmail] = useState<string>('');

    const token = storage.getToken();

    if(token) {
        const decodedToken = decodeToken(token) as TokenType;
        if(decodedToken.role !== role) {
            setRole(decodedToken.role);
            setEmail(decodedToken.email);
        }
    }
    
    const clear = () => {
        storage.clearToken();
        setRole('guest');
    };

    return {role, email, clear};
}