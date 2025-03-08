import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAuth } from "../../components/Auth/AuthContext";
import { getBillsAsync } from "../../api/billsAPI";
import { loadBills } from "../../actions/billActions";

function useLoadBills(setIsLoading = () => { }) {
    const { user } = useAuth();
    const { bills } = useSelector((state) => state.recurringPayments);
    const dispatch = useDispatch();

    useEffect(() => {
        const getBills = async () => {
            setIsLoading(true);
            try {
                const res = await getBillsAsync(user.uid);
                dispatch(loadBills(res));
            }
            catch (ex) {
                console.log(ex.message)
            }
            finally {
                setIsLoading(false);
            }
        }

        getBills();
    }, [dispatch, setIsLoading, user]);

    return bills;
}

export default useLoadBills;