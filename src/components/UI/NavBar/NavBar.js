import { useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import { useCallback, useEffect, useState } from 'react';
import { labels } from '../../../resources/labels';
import { useAuth } from '../../Auth/AuthContext';
import { logoutUser } from '../../../api/authAPI';
import CollapseSideBar from './CollapseSideBar/CollapseSideBar';
import routes from '../../../routes';
import './NavBar.css';

const NavBar = () => {
    const { isLoggedIn } = useAuth();
    const { currentMonth, currentYear } = useSelector((state) => state.transaction);
    const [show, setShow] = useState(true);
    const [navRoutes, setNavRoutes] = useState([]);
    const [lastScrollY, setLastScrollY] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        let filteredRoutes = routes.filter(route => route.navBarLabel);

        if (!isLoggedIn) {
            filteredRoutes = filteredRoutes.filter(route => !route.isProtected && route.navBarLabel !== labels.logout);
        }

        setNavRoutes(filteredRoutes);
    }, [isLoggedIn]);

    const controlNavbar = useCallback(() => {
        if (typeof window !== 'undefined') {
            if (window.scrollY > 0) {
                setShow(false);
            } else {
                setShow(true);
            }

            setLastScrollY(window.scrollY);
        }
    }, []);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            window.addEventListener('scroll', controlNavbar);

            return () => {
                window.removeEventListener('scroll', controlNavbar);
            };
        }
    }, [lastScrollY, controlNavbar]);

    const handleRouteClick = async (route) => {
        switch (route.navBarLabel) {
            case labels.logout:
                await logoutUser();
                break;
            default:
                break;
        }
    }

    const handleLogo = () => {
        navigate({
            pathname: isLoggedIn ? '/yearOverview' : '/auth'
        });
    }

    return (
        <nav className={show ? 'navbar fade-in' : 'navbar fade-out'}>
            <h2 onClick={handleLogo}>{labels.websiteName}</h2>
            <ul className='nav-list'>
                {navRoutes.map((route) => <li key={route.id}>
                    <NavLink
                        to={route.path}
                        onClick={() => { handleRouteClick(route) }}
                        className={
                            ({ isActive }) => {
                                return isActive ? 'active navbarLink' : 'navbarLink'
                            }
                        }
                    >
                        {route.navBarLabel}
                    </NavLink>
                </li>
                )}
            </ul>
            <CollapseSideBar
                currentMonth={currentMonth}
                currentYear={currentYear}
                routes={navRoutes}
                handleRouteClick={handleRouteClick}
            />
        </nav >
    );
}

export default NavBar;