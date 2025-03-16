
import React from 'react';
import { Navigate } from 'react-router-dom';
import Auth from './pages/Auth';
import About from './pages/About';
import Version from './pages/Version';
import Account from './pages/Account';
import Transactions from './pages/Transactions';
import AddTransaction from './components/Transaction/AddTransaction';
import RecurringPayments from './pages/RecurringPayments';
import { labels } from './resources/labels';

import LightDashboard from './assets/images/nav/light-dashboard-ios-17-glyph/dashboard-30.png';
import DarkDashboard from './assets/images/nav/dark-dashboard-ios-17-glyph/dashboard-30.png';
import LightRecords from './assets/images/nav/light-records-ios-17-glyph/records-30.png';
import DarkRecords from './assets/images/nav/dark-records-ios-17-glyph/records-30.png';
import LightRepeat from './assets/images/nav/light-repeat-ios-17-glyph/repeat-30.png';
import DarkRepeat from './assets/images/nav/dark-repeat-ios-17-glyph/repeat-30.png';

const Dashboard = React.lazy(() => import('./pages/Dashboard'));
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
        path: '/dashboard',
        component: <Dashboard />,
        isProtected: true,
        navBarLabel: labels.dashboard,
        orderId: 0,
        image: {
            light: LightDashboard,
            dark: DarkDashboard,
        }
    },
    {
        id: 2,
        path: '/transactions',
        component: <Transactions />,
        isProtected: true,
        navBarLabel: labels.transactions,
        orderId: 1,
        image: {
            light: LightRecords,
            dark: DarkRecords,
        }
    },
    {
        id: 3,
        path: '/transactions/addTransaction',
        component: <AddTransaction />,
        isProtected: true
    },
    {
        id: 5,
        path: '/account',
        component: <Account />,
        isProtected: true,
        navBarLabel: labels.account,
        orderId: 3,
        isDisplayed: false
    },
    {
        id: 6,
        path: '/about',
        component: <About />,
        navBarLabel: labels.about,
        isDisplayed: false,
        isFooter: true,
    },
    {
        id: 7,
        path: '/auth',
        component: <Auth />,
        isDisplayed: false
    },
    {
        id: 8,
        path: '/version',
        component: <Version />,
        navBarLabel: labels.versionHistory,
        isDisplayed: false,
        isFooter: true,
    },
    {
        id: 9,
        path: '*',
        component: <NotFoundPage />
    },
    {
        id: 10,
        path: '/recurringPayments',
        component: <RecurringPayments />,
        isProtected: true,
        navBarLabel: labels.recurringPayments,
        orderId: 2,
        image: {
            light: LightRepeat,
            dark: DarkRepeat,
        }
    },
];

export default routes;