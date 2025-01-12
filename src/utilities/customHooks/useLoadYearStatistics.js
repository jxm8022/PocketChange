import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { fetchYearStatistics } from "../../api/statisticsAPI";
import { loadStatistics } from "../../actions/statisticActions";

function useLoadYearStatistics() {
    const { userId, token } = useSelector((state) => state.user);
    const { currentYear } = useSelector((state) => state.transaction);
    const { statistics } = useSelector((state) => state.statistics);
    const [searchParams,] = useSearchParams();
    const dispatch = useDispatch();

    useEffect(() => {
        const year = searchParams.get('year') ?? currentYear;
        fetchYearStatistics(userId, year, token).then((res) => {
            dispatch(loadStatistics(res));
        });
    }, [dispatch, userId, token, searchParams, currentYear]);

    return statistics;
}

export default useLoadYearStatistics;