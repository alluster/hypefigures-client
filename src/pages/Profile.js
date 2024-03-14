import React, { useEffect, useContext } from 'react';
import styled from 'styled-components';
import { AppContext } from '../context/Context';
import { device } from '../device';
import Button from '../components/Button';
import Container from '../components/Container';
import { useAuth0 } from '@auth0/auth0-react';

const Wrapper = styled.div`
    @media ${device.laptop} {
    }
`;

const Profile = () => {
    const { logout, loginWithRedirect, user, isAuthenticated, isLoading } =
        useAuth0();

    const context = useContext(AppContext);

    useEffect(() => {
        context.setPath('/profile');
        window.scroll(0, 0);
    }, []);
    return (
        <Container>
            {isAuthenticated ? (
                <div>
                    <a
                        onClick={() =>
                            logout({ returnTo: window.location.origin })
                        }
                    >
                        <Button primary type="button">
                            Logout
                        </Button>
                    </a>
                </div>
            ) : (
                <a onClick={() => loginWithRedirect()}>
                    <Button primary type="button">
                        Login
                    </Button>
                </a>
            )}
        </Container>
    );
};

export default Profile;
