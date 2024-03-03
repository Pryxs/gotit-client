import type { RoleType } from "types"

type RoutesType = {
    name: string;
    path: string;
    authority: RoleType[]
}[]

export const routes: RoutesType = [
    {
        name: 'Gestion',
        path: 'management',
        authority: ['admin'],
    },
    {
        name: 'Créer un cours',
        path: 'editor',
        authority: ['editor'],
    },
    {
        name: 'Cours',
        path: 'lessons',
        authority: ['admin', 'editor', 'user', 'guest'],
    }
]