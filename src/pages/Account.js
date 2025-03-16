import { useState } from "react";
import { logoutUser } from "../api/authAPI";
import { labels } from "../resources/labels";
import { useAuth } from "../components/Auth/AuthContext";
import Loader from "../components/Common/Loader";
import Button from "../components/Common/Button";
import Template from "../components/Common/Template";
import AccountDetails from "../components/Account/AccountDetails";
import DataManagement from "../components/Account/DataManagement";
import useLoadAccounts from "../utilities/customHooks/useLoadAccounts";

const Account = () => {
    const { isLoggedIn } = useAuth();
    const [isLoading, setIsLoading] = useState(false);

    useLoadAccounts(setIsLoading);

    const handleLogout = async () => {
        await logoutUser();
    }

    return (
        <Template>
            <Loader isLoading={isLoading} />
            <h1>{labels.account}</h1>
            <AccountDetails />
            <DataManagement />
            <Button label={labels.logout} onClick={handleLogout} hide={!isLoggedIn} />
        </Template>
    );
}

export default Account;