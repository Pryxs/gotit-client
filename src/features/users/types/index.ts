export type IUser = {
    username: string,
    email: string,
    password: string,
    role: 'user' | 'editor' | 'admin',
    profile: {
        firstName: string,
        name: string,
        birthdate: string,
    }
}