import React, { useContext, useEffect } from 'react';
import styled from 'styled-components';
import { device } from '../styles/device-braking-points';
import Button from '../components/Button/Button';
import Container from '../components/Container/Container';
import { AppContext } from '../context/Context';
import LoginForm from '../components/Forms/Authentication/LoginForm';
import { useHistory } from "react-router-dom";

const Content = styled.div`
	margin-bottom: 100px;
	min-height: 100vh;

`;

const Grid = styled.div`
    margin-top: ${(props) => props.theme.grid.divider_12};
    display: flex;
    flex-flow: row wrap;
    align-content: flex-start;
    row-gap: 48px;
    column-gap: 48px;
    width: 100%;

    @media ${device.laptop} {
    }
`;
const Background = styled.div`
    z-index: 1;
    width: 100%;
    height: 100%;
    top: 0px;
    left: 0px;
    background: linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab);
    background-size: 400% 400%;
    animation: gradient 15s ease infinite;
    opacity: 1;
    @keyframes gradient {
        0% {
            background-position: 0% 50%;
        }
        50% {
            background-position: 100% 50%;
        }
        100% {
            background-position: 0% 50%;
        }
    }
`;
const WelcomeTitle = styled.div`
    margin-top: ${(props) => props.theme.grid.divider_12};
    // margin-bottom: ${(props) => props.theme.grid.divider_8};

    display: flex;
    flex-direction: column;
    // justify-content: center;
    // text-align: center;
    max-width: 400px;
    margin-left: auto;
    margin-right: auto;
    @media ${device.laptop} {
    }
`;
const Title = styled.h3`
    // text-align: center;
    font-weight: bold;
    margin-bottom: ${(props) => props.theme.grid.divider_4};
`;
const Ingress = styled.h4`
    // text-align: center;
    margin-bottom: ${(props) => props.theme.grid.divider_4};
`;

const Login = () => {
	const history = useHistory();

	const { setPath, isAuthenticated } = useContext(AppContext);

	useEffect(() => {
		if (isAuthenticated === true) {
			history.push("/dashboards");
		}
	}, [isAuthenticated])

	useEffect(() => {
		setPath('/login');
		window.scroll(0, 0);
		if (isAuthenticated === true) {
			history.push("/dashboards");
		}
	}, []);
	return (

		<Content>
			<WelcomeTitle>
				<Title>Welcome to Hyperfigures 🚀</Title>
				<Ingress>
					Please sign in to your account.
				</Ingress>
				<p>
					If you do not have an account - register now - it is free.
				</p>
			</WelcomeTitle>
			<LoginForm />

		</Content>

	);
};

export default Login;
