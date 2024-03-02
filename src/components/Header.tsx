import styled from '@emotion/styled'
import { useAuth } from 'hooks';
import { logout } from 'assets';
import { Icon, Button } from 'components'
import { useNavigate } from 'react-router';

const Container = styled.div({
    padding: '16px',
    display: 'flex',
    justifyContent: 'space-between',
    h1 : {
        fontSize: '28px',
        fontWeight: 'bold',
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
    }
})

const ButtonWrapper = styled.div({
    maxWidth: '220px',
})

const AccountWrapper = styled.div({
    display: 'flex',
    gap: '16px',
    alignItems: 'center',
    '@media (max-width: 540px)': {
        p: {
            display: 'none',
        }
    }
})

export const Header: React.FC = () => {
    const navigate = useNavigate();
    const { role, email, clear } = useAuth();

    return (
        <Container>
            <h1>Gotit - saas</h1>
            {role === 'guest' ? (
                <ButtonWrapper>
                    <Button name='Se connecter' onClick={() => navigate('/login')}/>
                </ButtonWrapper>
            ) : (
                <AccountWrapper>
                    <p>{email}</p>
                    <Icon svg={logout} onClick={clear}/>
                </AccountWrapper>
            )}
        </Container>
    )
};
