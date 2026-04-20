import { useEffect, useState } from "react";
import { getRates } from "../services/api";

const useCurrency = () => {
    const [rates, setRates] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getRates().then((data) => {
            setRates(data);
            setLoading(false);
        });
    }, []);

    const convert = (amount, currency) => {
        if (!rates[currency]) return amount;
        return amount * rates[currency];
    };

    return { convert, loading };
};

export default useCurrency;