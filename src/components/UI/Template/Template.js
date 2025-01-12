import versionHistory from "../../../assets/versionHistory";
import NavBar from "../NavBar/NavBar";
import Notification from "../Notification/Notification";
import styled from "styled-components";

const Template = (props) => {
    const latestVersion = versionHistory[versionHistory.length - 1].version;

    return (
        <TemplateWrapper>
            <NavBar />
            <Notification />
            <div className='children' style={{ paddingBottom: props.paddingBottom }}>
                {props.children}
                <a href='version' className='version'>v{latestVersion}</a>
            </div>
        </TemplateWrapper>
    );
}

export default Template;

const TemplateWrapper = styled.div`
    /* mobile */
    .children {
        min-height: 100vh;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        font-size: calc(10px + 2vmin);
        font-family:'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
    }

    .children h1 {
        margin-top: 100px;
        padding: 5px 20px;
    }

    /* tablets */
    @media only screen and (min-width: 600px) {}

    /* desktop */
    @media only screen and (min-width: 900px) {}

    @media (prefers-color-scheme: dark) {
        .children {
            background-color: var(--teal);
            color: var(--pink);
        }

        .children h1 {
            background-color: var(--pink);
            color: var(--teal);
        }
    }

    @media (prefers-color-scheme: light) {
        .children {
            background-color: var(--pink);
            color: var(--teal);
        }

        .children h1 {
            background-color: var(--teal);
            color: var(--pink);
        }
    }
`;