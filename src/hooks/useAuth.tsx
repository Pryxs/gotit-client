import storage from "utils/storage"
import { decodeToken } from "react-jwt";
import type { TokenType } from "types";

export const useAuth = () => {
    const token = storage.getToken();

    if(token ) {
        const { role } = decodeToken(token) as TokenType;
        return role;
    }

    return 'guest';
}