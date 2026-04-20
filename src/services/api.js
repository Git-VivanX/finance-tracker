import axios from "axios";

export const getRates = async () => {
    try {
        const res = await axios.get(
            "https://api.exchangerate-api.com/v4/latest/INR"
        );
        return res.data.rates;
    } catch (error) {
        console.error("Error fetching rates", error);
        return {};
    }
};