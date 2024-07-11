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

	margin-bottom: 100px;
	min-height: 100vh;
	max-width: 1600px;
	margin-top: 100px;
	margin-left: auto;
	margin-right: auto;
	position: relative;
	z-index: 2000;
`;

const WelcomeTitleContainer = styled.div`
	flex: 1;
	// width: 100%;
	margin-left: auto;
	margin-right: auto;
`;

const WelcomeTitle = styled.div`
    // margin-top: ${(props) => props.theme.grid.divider_6};
    // margin-bottom: ${(props) => props.theme.grid.divider_8};
	flex: 1;
    display: flex;
    flex-direction: column;
    max-width: 500px;
	margin-left: auto;
	margin-right: auto;
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
	flex: 1;
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
		<Container>

			<Content>
				<WelcomeTitleContainer>
					<WelcomeTitle>

						<Title>Welcome to Hyperfigures! 🤗</Title>

						<Ingress>
							Please fill all required fields to add AI to your Sheets.
						</Ingress>
						<span className=" max-w-max items-center rounded-md bg-green-50 px-4 py-4 text-s font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
							Free Account for limited time 💰
						</span>
						<RegisterForm />

					</WelcomeTitle>
				</WelcomeTitleContainer>

				{/* <VideoContainer>
						< src="https://demo.arcade.software/YGOVPgtYtFWemivsiuFA?embed&show_copy_link=true" title="Hyperfigures" frameBorder="0" loading="lazy" webkitallowfullscreen mozallowfullscreen allowfullscreen allow="clipboard-write" />

					</VideoContainer>

					 */}
			</Content>
		</Container>

	);
};

export default Register;
