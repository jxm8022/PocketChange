import { useEffect, useState } from "react";
import { useAuth } from "../Auth/AuthContext";
import { labels } from "../../resources/labels";
import { NavLink, useNavigate } from "react-router-dom";
import routes, { sortRoute } from "../../routes";
import UserProfile from "./UserProfile";
import styled from "styled-components";

const Nav = () => {
    const { isLoggedIn } = useAuth();
    const [navRoutes, setNavRoutes] = useState([]);
    const navigate = useNavigate();

    const [isDarkMode, setIsDarkMode] = useState(
        window.matchMedia("(prefers-color-scheme: dark)").matches
    );

    useEffect(() => {
        const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

        const handleChange = (e) => setIsDarkMode(e.matches);

        // Listen for changes
        mediaQuery.addEventListener("change", handleChange);

        return () => mediaQuery.removeEventListener("change", handleChange);
    }, []);

    useEffect(() => {
        let filteredRoutes = routes.filter(route => route.navBarLabel && route.isDisplayed !== false).sort(sortRoute);

        if (!isLoggedIn) {
            filteredRoutes = filteredRoutes.filter(route => !route.isProtected && route.navBarLabel !== labels.logout);
        }

        setNavRoutes(filteredRoutes);
    }, [isLoggedIn]);

    return (
        <NavWrapper>
            <h3 onClick={() => navigate('/dashboard')}>{labels.websiteName}</h3>
            <ul>
                {navRoutes.map((route) => <li key={route.id}>
                    <NavLink
                        to={route.path}
                        className={({ isActive }) => isActive ? 'activeIcon' : ''}
                    >
                        <img src={isDarkMode ? route.image.light : route.image.dark} alt={route.navBarLabel} />
                    </NavLink>
                </li>)}
                {isLoggedIn && <li>
                    <NavLink
                        to='/account'
                        className={({ isActive }) => isActive ? 'activeUserProfile' : ''}
                    >
                        <UserProfile />
                    </NavLink>
                </li>}
            </ul>
        </NavWrapper>
    );
}

export default Nav;

const NavWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 20px;

    h3 {
        margin: 0;
    }

    ul {
        margin: 0;
        padding: 0;
        list-style-type: none;
        display: flex;
        gap: 10px;
    }

    li {
        display: inline-block;
    }

    a {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 40px;
        height: 40px;
        border-radius: 50%;
        transition: background-color 0.3s ease-in-out;
    }

    a img {
        width: 24px;
        height: 24px;
        transition: filter 0.3s ease-in-out;
    }

    a.activeIcon img {
        filter: invert(1);
    }

    a.activeUserProfile img {
        width: 40px;
        height: 40px;
    }

    /* tablets */
    @media only screen and (min-width: 600px) {
    }

    /* desktop */
    @media only screen and (min-width: 900px) {
    }

    @media (prefers-color-scheme: dark) {
        background-color: var(--teal);

        h3 {
            color: var(--pink);
        }

        a.activeIcon {
            background-color: var(--pink);
        }
    }

    @media (prefers-color-scheme: light) {
        background-color: var(--pink);

        h3 {
            color: var(--teal);
        }

        a.activeIcon {
            background-color: var(--teal);
        }
    }
`;