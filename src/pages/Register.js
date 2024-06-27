import React, { useContext, useEffect } from 'react';
import styled from 'styled-components';
import { device } from '../styles/device-braking-points';
import Button from '../components/Button/Button';
import Container from '../components/Container/Container';
import { AppContext } from '../context/Context';
import LoginForm from '../components/Forms/Authentication/LoginForm';
import { useHistory } from "react-router-dom";
import RegisterForm from '../components/Forms/Authentication/RegisterForm';

const Content = styled.div`
	display: flex;
	flex-direction: row;
	margin-bottom: 100px;
	min-height: 100vh;
	max-width: 1600px;
	margin-top: 100px;
	margin-left: auto;
	margin-right: auto;
	position: relative;
	z-index: 2000;
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
	position: absolute;
    z-index: 2;
    width: 100%;
    height: 100%;
    // top: 0px;
    // left: 0px;
  
    }
`;
const WelcomeTitleContainer = styled.div`
	flex: 1;
	width: 100%;
`;

const WelcomeTitle = styled.div`
    // margin-top: ${(props) => props.theme.grid.divider_6};
    // margin-bottom: ${(props) => props.theme.grid.divider_8};
	flex: 1;
    display: flex;
    flex-direction: column;
    max-width: 500px;

	padding-right: 32px;

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
const VideoContainer = styled.div`
	padding: 16px;
	flex: 2;
	z-index: 5;
    width: 100%;
	min-height: 800px;
    height: 100%; // Adjust the height as needed, e.g., 100vh for full viewport height
    display: flex;
	flex-direction: column;
    // align-items: flex-start; // Align items to the start (top) of the container
    justify-content: center; // Optional: Center horizontally if needed

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
`;

const Video = styled.iframe`
    width: 100%;
	align-self: center; // Align items to the start (top) of the container
    min-height: 600px; // Ensure the video takes up the full height of its container
    display: block; // Ensures the iframe behaves like a block element
`;

const Register = () => {
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
		<div>
			<Container>
				<Content>
					<WelcomeTitleContainer>
						<WelcomeTitle>
							<Title>Welcome to Hyperfigures</Title>
							<Ingress>
								Please register to start using Hyperfigures!
							</Ingress>
							<RegisterForm />
						</WelcomeTitle>
					</WelcomeTitleContainer>

					<VideoContainer>
						<Video src="https://demo.arcade.software/YGOVPgtYtFWemivsiuFA?embed&show_copy_link=true" title="Hyperfigures" frameBorder="0" loading="lazy" webkitallowfullscreen mozallowfullscreen allowfullscreen allow="clipboard-write" ></Video>
						{/* <Background /> */}

					</VideoContainer>
				</Content>
			</Container>

		</div>

	);
};

export default Register;
