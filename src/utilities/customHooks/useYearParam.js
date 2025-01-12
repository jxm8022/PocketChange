import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";

function useYearParam() {
    const [searchParams, setSearchParams] = useSearchParams();
    const { currentYear } = useSelector((state) => state.transaction);

    useEffect(() => {
        const year = searchParams.get('year');
        if (!year)
        {
            setSearchParams(`year=${currentYear}`)
        }
    }, [searchParams, currentYear, setSearchParams]);
}

export default useYearParam;