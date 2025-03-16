import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Nav from "./Nav";
import routes from "../../routes";
import styled from "styled-components";

const Template = (props) => {
    const navigate = useNavigate();
    const [navRoutes, setNavRoutes] = useState([]);

    useEffect(() => {
        let filteredRoutes = routes.filter(route => route.navBarLabel && route.isFooter);

        setNavRoutes(filteredRoutes);
    }, []);

    return (
        <TemplateWrapper>
            <Nav />
            <div className='children'>
                {props.children}
            </div>
            <div className='footer'>
                <ul>
                    {navRoutes.map((route) => <li key={route.id}>
                        <p onClick={() => { window.scrollTo(0, 0); navigate(route.path); }}>{route.navBarLabel}</p>
                    </li>)}
                </ul>
            </div>
        </TemplateWrapper>
    );
}

export default Template;

const TemplateWrapper = styled.div`
    /* mobile */
    display: flex;
    flex-direction: column;
    min-height: 100vh;

    .children {
        display: flex;
        flex-grow: 1;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        font-size: calc(10px + 2vmin);
        font-family:'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
    }

    .children h1 {
        padding: 5px 20px;
        border-radius: 10px;
    }

    .footer {
        font-size: .8rem;
        height: 50px;
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .footer ul {
        margin: 0;
        padding: 0;
        list-style-type: none;
        display: flex;
        gap: 10px;
    }

    /* tablets */
    @media only screen and (min-width: 600px) {}

    /* desktop */
    @media only screen and (min-width: 900px) {}

    @media (prefers-color-scheme: dark) {
        .children,
        .footer {
            background-color: var(--teal);
            color: var(--pink);
        }

        .children h1 {
            background-color: var(--pink);
            color: var(--teal);
        }
    }

    @media (prefers-color-scheme: light) {
        .children,
        .footer {
            background-color: var(--pink);
            color: var(--teal);
        }

        .children h1 {
            background-color: var(--teal);
            color: var(--pink);
        }
    }
`;