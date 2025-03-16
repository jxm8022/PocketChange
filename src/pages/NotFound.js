import { Link } from "react-router-dom";
import { labels } from "../resources/labels";
import Template from "../components/Common/Template";

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

    if (currentPath === 'dashboard' || currentPath === 'addTransaction' || currentPath === 'monthOverview') {
        displayComponent = <LoggedOut />
    }

    return (
        <Template>
            {displayComponent}
        </Template>
    );
}

export default NotFound;