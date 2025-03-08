
import React from 'react';
import { Navigate } from 'react-router-dom';
import Auth from './pages/Auth';
import About from './pages/About';
import Version from './pages/Version';
import Account from './pages/Account';
import Statistics from './pages/Statistics';
import MonthOverview from './pages/MonthOverview';
import AddTransaction from './components/Transaction/AddTransaction';
import Subscriptions from './pages/Subscriptions';
import { labels } from './resources/labels';

const HomePage = React.lazy(() => import('./pages/Home'));
const NotFoundPage = React.lazy(() => import('./pages/NotFound'));

export const sortRoute = (a, b) => {
    if (a.orderId < b.orderId) { return -1; }
    if (a.orderId > b.orderId) { return 1; }
    return 0;
}

const routes = [
    {
        id: 0,
        path: '/',
        component: <Navigate replace to={'auth'} />
    },
    {
        id: 1,
        path: '/yearOverview',
        component: <HomePage />,
        isProtected: true,
    },
    {
        id: 2,
        path: '/monthOverview',
        component: <MonthOverview />,
        isProtected: true,
        navBarLabel: labels.monthOverview,
        orderId: 0,
    },
    {
        id: 3,
        path: '/monthOverview/addTransaction',
        component: <AddTransaction />,
        isProtected: true
    },
    {
        id: 4,
        path: '/statistics',
        component: <Statistics />,
        isProtected: true,
        navBarLabel: labels.statistics,
        isDisplayed: false
    },
    {
        id: 5,
        path: '/account',
        component: <Account />,
        isProtected: true,
        navBarLabel: labels.account,
        orderId: 1,
    },
    {
        id: 6,
        path: '/about',
        component: <About />,
        navBarLabel: labels.about,
        orderId: 3,
    },
    {
        id: 7,
        path: '/auth',
        component: <Auth />,
        navBarLabel: labels.logout,
        orderId: 999,
    },
    {
        id: 8,
        path: '/version',
        component: <Version />
    },
    {
        id: 9,
        path: '*',
        component: <NotFoundPage />
    },
    {
        id: 10,
        path: '/subscriptions',
        component: <Subscriptions />,
        isProtected: true,
        navBarLabel: labels.subscriptions,
        orderId: 2,
    },
];

export default routes;