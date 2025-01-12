import React, { Suspense, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, Route, Routes } from 'react-router-dom';
import { loadUser } from './actions/userActions';
import About from './pages/About';
import DisplayMonth from './pages/DisplayMonth';
import Auth from './pages/Auth';
import Version from './pages/Version';
import Account from './pages/Account';
import AddTransaction from './components/Transaction/AddTransaction';
import Statistics from './pages/Statistics';
import './App.css';

const HomePage = React.lazy(() => import('./pages/Home'));
const NotFoundPage = React.lazy(() => import('./pages/NotFound'));

function App() {
    const { isLoggedIn, userId } = useSelector((state) => state.user);
    const dispatch = useDispatch();

    let routes = [];

    if (isLoggedIn) {
        routes = [
            {
                path: '/',
                component: <Navigate replace to={'yearOverview'} />
            },
            {
                path: '/yearOverview',
                component: <HomePage />
            },
            {
                path: '/monthOverview',
                component: <DisplayMonth />
            },
            {
                path: '/monthOverview/addTransaction',
                component: <AddTransaction />
            },
            {
                path: '/statistics',
                component: <Statistics />
            },
            {
                path: '/account',
                component: <Account />
            }
        ]
    } else {
        routes = [
            {
                path: '/',
                component: <Navigate replace to={'auth'} />
            },
            {
                path: '/auth',
                component: <Auth />
            },
        ]
    }

    routes = [...routes,
    {
        path: '/about',
        component: <About />
    },
    {
        path: '/version',
        component: <Version />
    },
    {
        path: '*',
        component: <NotFoundPage />
    }
    ]

    useEffect(() => {
        if (!userId) {
            dispatch(loadUser());
        }
    }, [dispatch, userId]);

    return (
        <Suspense>
            <Routes>
                {
                    routes.map(route => {
                        const { path, component } = route;
                        return <Route key={path} path={path} element={component} />;
                    })
                }
            </Routes>
        </Suspense>
    );
}

export default App;
