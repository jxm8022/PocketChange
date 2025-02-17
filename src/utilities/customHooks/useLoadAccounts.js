import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAccountsAsync } from "../../api/accountAPI";
import { loadAccounts } from "../../actions/accountActions";
import { useAuth } from "../../components/Auth/AuthContext";

function useLoadAccounts(setIsLoading = () => { }) {
    const { user } = useAuth();
    const { accounts, accountDictionary } = useSelector((state) => state.accounts);
    const dispatch = useDispatch();

    useEffect(() => {
        const getAccounts = async () => {
            setIsLoading(true);
            try {
                const res = await getAccountsAsync(user.uid);
                dispatch(loadAccounts(res));
            }
            catch (ex) {
                console.log(ex.message)
            }
            finally {
                setIsLoading(false);
            }
        }

        getAccounts();
    }, [dispatch, setIsLoading, user]);

    return [accounts, accountDictionary];
}

export default useLoadAccounts;