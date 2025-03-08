import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAuth } from "../../components/Auth/AuthContext";
import { loadSubscriptions } from "../../actions/subscriptionActions";
import { getSubscriptionsAsync } from "../../api/subscriptionsAPI";

function useLoadSubscriptions(setIsLoading = () => { }) {
    const { user } = useAuth();
    const { subscriptions } = useSelector((state) => state.subscription);
    const dispatch = useDispatch();

    useEffect(() => {
        const getSubscriptions = async () => {
            setIsLoading(true);
            try {
                const res = await getSubscriptionsAsync(user.uid);
                dispatch(loadSubscriptions(res));
            }
            catch (ex) {
                console.log(ex.message)
            }
            finally {
                setIsLoading(false);
            }
        }

        getSubscriptions();
    }, [dispatch, setIsLoading, user]);

    return subscriptions;
}

export default useLoadSubscriptions;