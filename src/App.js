import React, { Suspense, useContext, useState } from 'react';
import ReactDOM from 'react-dom';
import { device } from './device';

import theme from './theme';
import { ThemeProvider } from 'styled-components';
import { createGlobalStyle } from 'styled-components';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';


import Navigation from './components/Navigation';
import Notification from './components/Notification';
import SpinnerSmall from './components/SpinnerSmall';
import Footer from './components/Footer';
import DataSources from './pages/DataSources';
import TopNav from './components/TopNav';
import Spinner from './components/Spinner';
//pages
const Profile = React.lazy(() => import('./pages/Profile'));
const Dashboard = React.lazy(() => import('./pages/Dashboard'));
const Dashboards = React.lazy(() => import('./pages/Dashboards'));

const ErrorPage = React.lazy(() => import('./pages/ErrorPage'));
const Home = React.lazy(() => import('./pages/Home'));
const Login = React.lazy(() => import('./pages/Login'));
const DataPoint = React.lazy(() => import('./pages/DataPoint'));
const DataPoints = React.lazy(() => import('./pages/DataPoints'));

import DataSourceGoogle from './pages/DataSourceGoogle';
import DashboardPublic from './pages/DashboardPublic';
import Container from './components/Container';
import { AppContext } from './context/Context';
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min';

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
		background-color: ${(props) => props.theme.colors.white};
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
			isAuthenticated
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
							<Login />
						)
					}
				/>
			);
		}
	};

	return (
		<Suspense fallback={<SpinnerSmall />}>
			<ThemeProvider theme={theme}>
				<Router>
					<Navigation />
					<TopNav />
					<Notification />
					<Switch>
						<PrivateRoute exact path="/" component={() => <Home />} />
						<PrivateRoute
							exact
							path="/publicdashboard/:id"
							component={() => <DashboardPublic />}
						/>
						<PrivateRoute exact path="/user" component={Profile} />
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
						<Route exact path="/error" component={ErrorPage} />
						<PrivateRoute
							exact
							path="/datapoints"
							component={DataPoints}
						/>
						<PrivateRoute
							exact
							path="/datapoints/:id"
							component={DataPoint}
						/>
						<PrivateRoute
							exact
							path="/datasources"
							component={DataSources}
						/>
						<PrivateRoute
							exact
							path="/datasources/google"
							component={DataSourceGoogle}
						/>

						<Route exact path="/login" component={Login} />
					</Switch>
					<Footer />
				</Router>
				<GlobalStyle />
			</ThemeProvider>
		</Suspense>
	);
};

export default App;
