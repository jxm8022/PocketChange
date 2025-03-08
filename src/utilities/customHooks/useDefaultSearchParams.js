import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

const useDefaultSearchParams = (yearRequired = false, monthRequired = false) => {
    const [searchParams, setSearchParams] = useSearchParams();

    useEffect(() => {
        const now = new Date();
        const currentYear = now.getFullYear();
        const currentMonth = (now.getMonth() + 1).toString().padStart(2, "0"); // Format as "01"-"12"

        let params = {};
        let updated = false;
        if (yearRequired && !searchParams.get("year")) {
            params.year = currentYear;
            updated = true;
        }

        if (monthRequired && !searchParams.get("month")) {
            params.month = currentMonth;
            updated = true;
        }

        if (updated) {
            setSearchParams(params);
        }
    }, [yearRequired, monthRequired, searchParams, setSearchParams]);

    const updateParams = (params) => {
        const newParams = new URLSearchParams(searchParams);

        Object.entries(params).forEach(([key, value]) => {
            if (value === null || value === undefined) {
                newParams.delete(key); // Remove param if null/undefined
            } else {
                newParams.set(key, value); // Update or add param
            }
        });

        setSearchParams(newParams);
    };

    return { searchParams, updateParams };
};

export default useDefaultSearchParams;
