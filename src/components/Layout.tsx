import { ReactElement } from 'react';
import { Header } from './Header';

export const Layout: React.FC<{ children: ReactElement}> = ({children}) => {
    return (
        <>
            <Header />
            <main>
                { children }
            </main>
        </>
    )
};
