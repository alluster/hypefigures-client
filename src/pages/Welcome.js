import React, { useContext, useEffect } from 'react';
import styled from 'styled-components';
import { device } from '../styles/device-braking-points';
import { AppContext } from '../context/Context';
import LoginForm from '../components/Forms/Authentication/LoginForm';
import { useHistory } from "react-router-dom";
import PrisingTable from '../components/Patterns/PrisingTable/PricingTable';
import PricingTable from '../components/Patterns/PrisingTable/PricingTable';

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

const Welcome = () => {
	const history = useHistory();

	const { setPath, isAuthenticated, user } = useContext(AppContext);

	useEffect(() => {
		if (user?.stripe_subscription === true && user?.stripe_price_id != null) {
			history.push("/dashboards");
		}
	}, [user])

	useEffect(() => {
		window.scroll(0, 0);
		if (isAuthenticated != true) {
			history.push("/");
		}
		if (user[0]?.stripe_subscription === true && user[0]?.stripe_price_id != null) {
			history.push("/dashboards");
		}
	}, []);
	return (

		<Content>
			<PricingTable />
		</Content >

	);
};

export default Welcome;
