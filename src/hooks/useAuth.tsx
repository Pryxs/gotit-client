import storage from "utils/storage"
import { decodeToken } from "react-jwt";
import type { RoleType, TokenType } from "types";
import { useState } from "react";

export const useAuth = () => {
    const [role, setRole] = useState<RoleType>('guest');
    const [email, setEmail] = useState<string>('');

    const clear = () => {
        storage.clearToken();
        setRole('guest');
    };

    const token = storage.getToken();

    if(token) {
        const decodedToken = decodeToken(token) as TokenType;
        if (decodedToken.exp * 1000 < Date.now()) clear()

        if(decodedToken.role !== role) {
            setRole(decodedToken.role);
            setEmail(decodedToken.email);
        }
    }
    
    return {role, email, clear};
}