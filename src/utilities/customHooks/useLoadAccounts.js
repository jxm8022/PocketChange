import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAccounts } from "../../api/accountAPI";
import { loadAccounts } from "../../actions/accountActions";

function useLoadAccounts() {
    const { userId, token } = useSelector((state) => state.user);
    const { accounts, accountDictionary } = useSelector((state) => state.accounts);
    const dispatch = useDispatch();

    useEffect(() => {
        fetchAccounts(userId, token).then((res) => {
            dispatch(loadAccounts(res));
        });
    },[dispatch, userId, token]);

    return [accounts, accountDictionary];
}

export default useLoadAccounts;