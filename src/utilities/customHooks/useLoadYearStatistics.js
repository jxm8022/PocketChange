import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAuth } from "../../components/Auth/AuthContext";
import { getYearStatisticsAsync } from "../../api/statisticsAPI";
import { loadStatistics } from "../../actions/statisticActions";
import useDefaultSearchParams from "./useDefaultSearchParams";

function useLoadYearStatistics(setIsLoading = () => { }) {
    const { user } = useAuth();
    const { statistics } = useSelector((state) => state.statistics);
    const dispatch = useDispatch();

    const { searchParams } = useDefaultSearchParams();
    useEffect(() => {
        const getYearStatistics = async () => {
            setIsLoading(true);
            try {
                const year = searchParams.get('year');
                const res = await getYearStatisticsAsync(user.uid, year);
                dispatch(loadStatistics(res));
            }
            catch (ex) {
                console.log(ex.message)
            }
            finally {
                setIsLoading(false);
            }
        }

        getYearStatistics();
    }, [dispatch, setIsLoading, user, searchParams]);

    return statistics;
}

export default useLoadYearStatistics;