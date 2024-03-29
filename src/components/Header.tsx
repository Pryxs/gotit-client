import styled from '@emotion/styled'
import { useAuth } from 'hooks';
import { logout as logoutIncon } from 'assets';
import { Icon, Button } from 'components'
import { useNavigate } from 'react-router';
import { routes } from 'utils/routes';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { menu, close } from 'assets';
import { useLocation } from "react-router-dom";

const Container = styled.div({
    padding: '16px',
    display: 'flex',
    h1 : {
        fontSize: '28px',
        fontWeight: 'bold',
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
        marginRight: '40px',
    }
})

const ButtonWrapper = styled.div({
    maxWidth: '220px',
    '@media (max-width: 800px)': {
        width: 'fit-content',
        margin: '40px auto 0 auto',
    },
})

const Navigation = styled.div(({ isOpen }: { isOpen: boolean}) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flex: 1,
    '@media (max-width: 800px)': {
        display: isOpen ? 'block' : 'none',
        flexDirection: 'column',
        background: 'var(--light)',
        position: 'absolute',
        zIndex: 50,
        top: 0,
        left: 0,
        width: '100%',
        padding: '24px',
        paddingTop: '100px',
    }
}))

const Menu =  styled.div({
    width: '100%',
    display: 'flex',
    justifyContent: 'start',
    a: {
        margin: '0 24px',
        fontSize: '18px',
        color: 'var(--dynamic-color)',
        '&:hover': {
            textDecoration: 'underline',
        },
    },
    '@media (max-width: 800px)': {
        flexDirection: 'column',
        gap: '16px',
        alignItems: 'center',
        a: {
            fontSize: '24px',
            width: 'fit-content',
        }
    }
})

const TriggerMenu = styled.button({
    display: 'none',
    marginLeft: 'auto',
    zIndex: '10',
    '@media (max-width: 800px)': {
        display: 'block',
    }
})

const AccountWrapper = styled.div({
    display: 'flex',
    gap: '16px',
    alignItems: 'center',
    justifyContent: 'center',
    '@media (max-width: 800px)': {
        borderTop: '1px solid var(--dark)',
        padding: '40px',
        width: 'fit-content',
        margin: '40px auto 0 auto',
    },
})

export const Header: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { role, email, clear } = useAuth();

    const currentPath = location.pathname;

    const logout = () => {
        clear();
        navigate(0)
    }

    const[isOpen, setIsOpen] = useState<boolean>(false)

    return (
        <Container>
            <h1>Gotit - saas</h1>
            <Navigation isOpen={isOpen}>
                <Menu>
                {routes.map(route => 
                    route.authority.includes(role) && (
                        <Link 
                            key={route.path} 
                            to={currentPath === route.path ? '#' : route.path}
                            style={{ ...(currentPath === route.path && {
                                pointerEvents: 'none',
                                 textDecoration: 'underline'
                            })}}
                        >
                            {route.name}
                        </Link>
                    )
                )}
                </Menu>

            {role === 'guest' ? (
                <ButtonWrapper>
                    <Button name='Se connecter' onClick={() => navigate('/login')}/>
                </ButtonWrapper>
            ) : (
                <AccountWrapper>
                    <p>{email}</p>
                    <Icon svg={logoutIncon} onClick={() => logout()} size={24}/>
                </AccountWrapper>
            )}
            </Navigation>
            <TriggerMenu onClick={() => setIsOpen(prev => !prev)}>
                <Icon svg={isOpen ? close : menu} />
            </TriggerMenu>
        </Container>
    )
};
