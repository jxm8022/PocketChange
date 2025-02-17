import React, { Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import ProtectedRoute from './components/Common/ProtectedRoute';
import routes from './routes';
import './App.css';

function App() {
    return (
        <Suspense>
            <Routes>
                {
                    routes.map(route => {
                        const { path, component, isProtected } = route;
                        return <Route key={path} path={path} element={isProtected ? <ProtectedRoute>{component}</ProtectedRoute> : component} />;
                    })
                }
            </Routes>
        </Suspense>
    );
}

export default App;
