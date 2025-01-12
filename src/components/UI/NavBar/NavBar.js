import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import { logout } from '../../../actions/userActions';
import { labels } from '../../../resources/labels';
import CollapseSideBar from './CollapseSideBar/CollapseSideBar';
import './NavBar.css';
import { useCallback, useEffect, useState } from 'react';

const NavBar = () => {
    const { currentMonth, currentYear } = useSelector((state) => state.transaction);
    const { isLoggedIn } = useSelector((state) => state.user);
    const [show, setShow] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const controlNavbar = useCallback(() => {
        if (typeof window !== 'undefined') {
            if (window.scrollY > 0) {
                setShow(false);
            } else {
                setShow(true);
            }

            setLastScrollY(window.scrollY);
        }
    },[]);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            window.addEventListener('scroll', controlNavbar);

            return () => {
                window.removeEventListener('scroll', controlNavbar);
            };
        }
    }, [lastScrollY, controlNavbar]);

    const handleLogout = () => {
        dispatch(logout());
        navigate({
            pathname: '/auth',
        });
    }

    const handleLogo = () => {
        navigate({
            pathname: isLoggedIn ? '/yearOverview' : '/auth'
        });
    }

    let links = [];
    if (isLoggedIn) {
        links = [
            {
                id: 0,
                where: `../yearOverview?year=${currentYear}`,
                name: labels.home
            },
            {
                id: 1,
                where: '../account',
                name: labels.account
            },
            {
                id: 2,
                where: `../monthOverview?month=${currentMonth}&year=${currentYear}`,
                name: labels.monthOverview
            },/*
            {
                id: 3,
                where: `../statistics`,
                name: labels.statistics
            },*/
            {
                id: 5,
                where: `../about`,
                name: labels.about
            },
            {
                id: 6,
                where: `../auth`,
                name: labels.logout,
                do: handleLogout
            }
        ]
    } else {
        links = [
            {
                id: 7,
                where: `../about`,
                name: labels.about
            }
        ]
    }

    return (
        <nav className={show ? 'navbar fade-in' : 'navbar fade-out'}>
            <h2 onClick={handleLogo}>{labels.websiteName}</h2>
            <ul className='nav-list'>
                {links.map((link) => <li key={link.id}>
                    <NavLink
                        to={link.where}
                        onClick={link.do}
                        className={
                            ({ isActive }) => {
                                return isActive ? 'active navbarLink' : 'navbarLink'
                            }
                        }
                    >
                        {link.name}
                    </NavLink>
                </li>
                )}
            </ul>
            <CollapseSideBar
                currentMonth={currentMonth}
                currentYear={currentYear}
                links={links}
            />
        </nav >
    );
}

export default NavBar;