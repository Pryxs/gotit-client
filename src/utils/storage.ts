const storagePrefix = 'gotit_';

const storage = {
    getToken: () => {
        const token = window.localStorage.getItem(`${storagePrefix}token`) as string
        if (token) return JSON.parse(token);

        return undefined;
    },
    setToken: (token: string) => {
        window.localStorage.setItem(`${storagePrefix}token`, JSON.stringify(token));
    },
    clearToken: () => {
        window.localStorage.removeItem(`${storagePrefix}token`);
    },
};

export default storage;