import React, { useContext, useEffect } from 'react';
import styled from 'styled-components';
import { device } from '../device';
import Button from '../components/Button';
import { AppContext } from '../context/Context';
import { useParams, useHistory } from 'react-router-dom';

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
    padding-top: ${(props) => props.theme.grid.divider_5};
    padding-bottom: ${(props) => props.theme.grid.divider_5};
    padding-right: ${(props) => props.theme.grid.divider_2};
    padding-left: ${(props) => props.theme.grid.divider_2};

    z-index: 3;
    display: flex;
    position: relative;
    flex-direction: column;
    justify-content: center;
    text-align: center;
    max-width: 900px;
    margin-left: auto;
    height: 100%;
    min-height: 100vh;
    align-items: center;
    margin-right: auto;
    @media ${device.laptop} {
    }
`;
const Title = styled.h1`
    text-align: center;
    font-weight: bold;
    margin-bottom: ${(props) => props.theme.grid.divider_4};
    color: white;
    // -webkit-text-stroke: 2px #fff;
`;
const Ingress = styled.h3`
    text-align: center;
    margin-bottom: ${(props) => props.theme.grid.divider_4};
    color: ${(props) => props.theme.colors.white};
`;

const List = styled.div`
    margin-bottom: 30px;
    color: ${(props) => props.theme.colors.white};
`;
const Image = styled.img`
    margin-bottom: ${(props) => props.theme.grid.divider_8};
`;

const Home = () => {
	const { setPath, isAuthenticated } = useContext(AppContext);
	const handleClick = () => {
		window.location = 'mailto:aleksanteri@helau.io';
	};
	const history = useHistory();

	useEffect(() => {
		setPath('/');
		window.scroll(0, 0);
		isAuthenticated && history.push('/dashboards')
	}, []);
	return (
		<Background>
			<WelcomeTitle>
				<Title>Business Intelligence for Humans.</Title>
				{/* <Image src="/logo.svg" /> */}

				{/* <Title>Take control over your data!</Title> */}
				{/* <Ingress>Take control of your Business Data Supersets and get in touch now!</Ingress> */}
				<Ingress>
					Combine all data sources to build beautiful reports and
					dashboards!
				</Ingress>
				<List>
					<p>
						Connect all your business data sources and execute
						calculations and business operations without boundaries.
					</p>
				</List>
				<Button type="button" primary onClick={handleClick}>
					Not yet a user? Get in touch
				</Button>
				{/* <h5 style={{ marginTop: '24px', marginBottom: '24px' }}>or</h5>
					<a href="/login">
						<Button
							white
							type=""
						>
							Sign in
						</Button>
					</a> */}
			</WelcomeTitle>

			<Background />
		</Background>
	);
};

export default Home;
