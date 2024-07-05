import React, { Suspense, useContext, useEffect } from 'react';
import { device } from './styles/device-braking-points';
import theme from './styles/theme';
import { ThemeProvider } from 'styled-components';
import { createGlobalStyle } from 'styled-components';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import '../src/styles/css/tailwindcss/tailwind.css';// Import Tailwind CSS
import { XMarkIcon } from '@heroicons/react/20/solid'

// components

import Navigation from './components/Navigation/Navigation';
import Notification from './components/Notification/Notification';
import SpinnerSmall from './components/Spinner/SpinnerSmall';
import DataSources from './pages/DataSources';
import TopNav from './components/Navigation/TopNav';
import Spinner from './components/Spinner/Spinner';

//pages

const Profile = React.lazy(() => import('./pages/Profile'));
const Dashboard = React.lazy(() => import('./pages/Dashboard'));
const Dashboards = React.lazy(() => import('./pages/Dashboards'));
const ErrorPage = React.lazy(() => import('./pages/ErrorPage'));
const Login = React.lazy(() => import('./pages/Login'));
const DataPoint = React.lazy(() => import('./pages/DataPoint'));
const Team = React.lazy(() => import('./pages/Team'));
const DataTable = React.lazy(() => import('./pages/DataTable'));
const Register = React.lazy(() => import('./pages/Register'));
const Welcome = React.lazy(() => import('./pages/Welcome'));

import { AppContext } from './context/Context';
import Invitations from './pages/Invitations';
import Button from './components/Button/Button';

library.add(fas);

const GlobalStyle = createGlobalStyle`
    body, html {
        margin: 0px;
        padding: 0px;
		max-width: 100% !important;
		overflow-x: hidden !important;
		// overflow-y: auto;
		font-family: 'Rubik', sans-serif;
		font-weight: ${(props) => props.theme.fontWeight.regular};
		font-display: swap;
		color: ${(props) => props.theme.colors.black};
		hyphens: manual;
		text-rendering: optimizeLegibility;
		background-color: ${(props) => props.theme.colors.gray_20};
	}

    
    h1 {
		font-weight: ${(props) => props.theme.fontWeight.regular};
		font-size: 90.44px;
		line-height: 112px;
		margin: 0px;
		@media ${device.laptop} {
			font-size: 40.83px;
			line-height: 40px
		}
    }
    h2 {
		font-weight: ${(props) => props.theme.fontWeight.regular};
		font-size: 63.96px;
		line-height: 80px;
		margin: 0px;
		@media ${device.laptop} {
			font-size: 	25.63px;
			line-height: 32px
		}
    }
    h3 {
		font-weight: ${(props) => props.theme.fontWeight.regular};
		font-size: 45.23px;
		line-height: 48px;
		margin: 0px;
		@media ${device.laptop} {
			font-size: 	22.78px;
			line-height: 32px
		}
    }
    h4 {
		font-weight: ${(props) => props.theme.fontWeight.regular};
		font-size: 31.99px;
		line-height: 40px;
		margin: 0px;
		@media ${device.laptop} {
			font-size: 	20.25px;
			line-height: 24px
		}
    }
    h5 {
		font-weight: ${(props) => props.theme.fontWeight.regular};
		font-size: 22.62px;
		line-height: 32px;
		margin: 0px;
		@media ${device.laptop} {
			font-size: 	18px;
			line-height: 24px
		}
    }
    h6 {
		font-weight: ${(props) => props.theme.fontWeight.regular};
		font-size: 18px;
		line-height: 24px;
		margin: 0px;
		@media ${device.laptop} {
			font-size: 	16px;
			line-height: 24px
		}
	}
	p {
		font-weight: ${(props) => props.theme.fontWeight.regular};
		font-size: 18px;
		line-height: 24px;
		margin: 0px;
		@media ${device.laptop} {
			font-size: 	16px;
			line-height: 24px
		}

	}
	small-desktop {
		font-weight: ${(props) => props.theme.fontWeight.regular};
		font-size: 14px;
		line-height: 24px;
		margin: 0px;
	}
    img {
        max-width: 100%;
	}
	a, a:link, a:visited, a:focus, a:hover, a:active{
		color: inherit;
		text-decoration:none; 
		cursor: pointer;
	  }
  
    button {
		all: unset;
		font-family: 'Open Sans', sans-serif;
		

	}
	button:hover {
		cursor: pointer !important;
	}
    input {
		all: unset;
		font-family: 'Open Sans', sans-serif;

        ::-webkit-input-placeholder {
	}
	input, select {
		-webkit-box-sizing: border-box;
		   -moz-box-sizing: border-box;
				box-sizing: border-box;
	}
    :-moz-placeholder {
        /* FF 4-18 */
        opacity: 1;
    }
    ::-moz-placeholder {
        /* FF 19+ */
        opacity: 1;
    }
    :-ms-input-placeholder {
        /* IE 10+ */
    }
    ::-ms-input-placeholder {
        /* Microsoft Edge */
    }
    ::placeholder {
        /* modern browser */
    }
    
    
`;

const App = () => {
	const PrivateRoute = ({ component: Component, ...rest }) => {
		const {
			loadingUser,
			isAuthenticated,
			user
		} = useContext(AppContext);

		if (loadingUser) {
			return <Spinner />;
		} else {
			return (
				<Route
					{...rest}
					render={(props) =>
						isAuthenticated ? (
							<Component {...props} />
						) : (
							<Register />
						)
					}
				/>
			);
		}
	};
	const NoSubscriptionBanner = () => {
		const {
			activeTeam
		} = useContext(AppContext);
		const Banner = () => {
			return (

				activeTeam[0]?.stripe_subscription != true
					?
					<div className="relative isolate flex justify-center items-center gap-x-6 overflow-hidden bg-gray-50 px-6 py-2.5 sm:px-3.5 sm:before:flex-1">
						<div
							aria-hidden="true"
							className="absolute left-[max(-7rem,calc(50%-52rem))] top-1/2 -z-10 -translate-y-1/2 transform-gpu blur-2xl"
						>
							<div
								style={{
									clipPath:
										'polygon(74.8% 41.9%, 97.2% 73.2%, 100% 34.9%, 92.5% 0.4%, 87.5% 0%, 75% 28.6%, 58.5% 54.6%, 50.1% 56.8%, 46.9% 44%, 48.3% 17.4%, 24.7% 53.9%, 0% 27.9%, 11.9% 74.2%, 24.9% 54.1%, 68.6% 100%, 74.8% 41.9%)',
								}}
								className="aspect-[577/310] w-[36.0625rem] bg-gradient-to-r from-[#ff80b5] to-[#9089fc] opacity-30"
							/>
						</div>
						<div
							aria-hidden="true"
							className="absolute left-[max(45rem,calc(50%+8rem))] top-1/2 -z-10 -translate-y-1/2 transform-gpu blur-2xl"
						>
							<div
								style={{
									clipPath:
										'polygon(74.8% 41.9%, 97.2% 73.2%, 100% 34.9%, 92.5% 0.4%, 87.5% 0%, 75% 28.6%, 58.5% 54.6%, 50.1% 56.8%, 46.9% 44%, 48.3% 17.4%, 24.7% 53.9%, 0% 27.9%, 11.9% 74.2%, 24.9% 54.1%, 68.6% 100%, 74.8% 41.9%)',
								}}
								className="aspect-[577/310] w-[36.0625rem] bg-gradient-to-r from-[#ff80b5] to-[#9089fc] opacity-30"
							/>
						</div>
						<div className="flex flex-wrap justify-center ml-auto mr-auto items-center gap-x-4 gap-y-2">
							<p className="text-sm leading-6 text-gray-900">
								<strong className="font-semibold">Your team seems to be running without an active plan</strong>
								<svg viewBox="0 0 2 2" aria-hidden="true" className="mx-2 inline h-0.5 w-0.5 fill-current">
									<circle r={1} cx={1} cy={1} />
								</svg>
								Join us and purchase a subscription to unlock all features.
							</p>
							<Button
								title='View plans'
								small
								type='button'
								layoutType='link'
								primary
								to={`/teams/${activeTeam[0]?.id}`}
							/>
						</div>

					</div>
					:
					null
			)
		}
		useEffect(() => {
			Banner

		}, [activeTeam])

		return (
			<Banner />

		)
	}
	return (
		<Suspense fallback={<SpinnerSmall />}>
			<ThemeProvider theme={theme}>
				<Router>
					<Navigation />
					<NoSubscriptionBanner />
					<TopNav />

					<Notification />
					<Switch>
						<Route exact path="/" component={Login} />
						<Route exact path="/register" component={Register} />

						<Route exact path="/error" component={ErrorPage} />
						<PrivateRoute exact path="/user" component={Profile} />
						<PrivateRoute exact path="/welcome" component={Welcome} />

						<PrivateRoute
							exact
							path="/dashboards/:id"
							component={Dashboard}
						/>
						<PrivateRoute
							exact
							path="/dashboards"
							component={Dashboards}
						/>
						<PrivateRoute
							exact
							path="/datapoints/:id"
							component={DataPoint}
						/>
						<PrivateRoute
							exact
							path="/datatables/:id"
							component={DataTable}
						/>
						<PrivateRoute
							exact
							path="/teams/:id"
							component={Team}
						/>
						<PrivateRoute
							exact
							path="/datasources"
							component={DataSources}
						/>
						<PrivateRoute
							exact
							path="/invitations"
							component={Invitations}
						/>
					</Switch>
					{/* <Footer /> */}
				</Router>
				<GlobalStyle />
			</ThemeProvider>
		</Suspense>
	);
};

export default App;
