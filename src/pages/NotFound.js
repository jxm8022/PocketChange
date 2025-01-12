import { Link } from "react-router-dom";
import Template from "../components/UI/Template/Template";
import { labels } from "../resources/labels";

const LoggedOut = () => {
    return (
        <>
            <h1>{labels.notLoggedIn}</h1>
            <Link to={'/auth'}>{labels.login}</Link>
        </>
    );
}

const WhatThe = () => {
    return (
        <>
            <h1>{labels.notExist}</h1>
            <Link to={'/'}>{labels.existingPlace}</Link>
        </>
    );
}

const NotFound = () => {
    const currentPath = window.location.pathname.slice(1);

    let displayComponent = <WhatThe />

    if (currentPath === 'yearOverview' || currentPath === 'addTransaction' || currentPath === 'monthOverview') {
        displayComponent = <LoggedOut />
    }

    return (
        <Template>
            {displayComponent}
        </Template>
    );
}

export default NotFound;