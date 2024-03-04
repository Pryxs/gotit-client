import styled from '@emotion/styled'
import { Icon } from './Icon';
import { close } from 'assets';

const Container = styled.div({
    position: 'absolute',
    zIndex: 40,
    padding: '20px',
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
    background: 'var(--white)',
    top: '45%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    maxWidth: '575px',
    width: '100%',
})

const Backdrop = styled.div({
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    background: 'var(--light)',
    opacity: .7,
    zIndex: 30,
})

const Header = styled.div({
    display: 'flex',
    justifyContent: 'space-between',
    gap: '16px',
    paddingBottom: '16px',
    borderBottom: '1px solid var(--light)',
    fontWeight: 'bold',
    fontSize: '18px',
})

type ModalProps = {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
    children: React.ReactNode;
    title?: string;
};

export const Modal: React.FC<ModalProps> = ({ isOpen, setIsOpen, children, title }) => {

    if(!isOpen) return <div/>;

    return (
        <>
            <Backdrop/>
            <Container>
                <Header>
                    {title ? (
                    <h3>{title}</h3>
                    ) : ( <div/>)}
                    <Icon svg={close} onClick={() => setIsOpen(false)} />
                </Header>
                {children}
            </Container>
        </>
        
    )
};
