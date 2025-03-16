import { useState } from "react";
import { logoutUser } from "../api/authAPI";
import { labels } from "../resources/labels";
import { useAuth } from "../components/Auth/AuthContext";
import Loader from "../components/UI/Loader/Loader";
import Accounts from "../components/Account/Accounts";
import Template from "../components/UI/Template/Template";
import DataManagement from "../components/Account/DataManagement";
import useLoadAccounts from "../utilities/customHooks/useLoadAccounts";
import UpdatePassword from "../components/Auth/UpdatePassword/UpdatePassword";

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
            <Accounts />
            <UpdatePassword />
            <DataManagement />
            {isLoggedIn && <button onClick={handleLogout}>Logout</button>}
        </Template>
    );
}

export default Account;