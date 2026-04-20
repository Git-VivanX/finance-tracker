import { useContext } from "react";
import { FinanceContext } from "../context/FinanceContext";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
} from "recharts";

function MonthlyLineChart() {
    const { transactions } = useContext(FinanceContext);

    if (!transactions || transactions.length === 0) {
        return <div className="empty-state"><p>📈 No transaction data available</p></div>;
    }

    const dataMap = {};

    transactions.forEach((t) => {
        if (t.type.toLowerCase() !== "expense") return;

        const date = new Date(t.date).toISOString().split("T")[0]; // YYYY-MM-DD

        if (!dataMap[date]) {
            dataMap[date] = { date, total: 0 };
        }

        dataMap[date].total += t.amount;
    });

    const data = Object.values(dataMap).sort(
        (a, b) => new Date(a.date) - new Date(b.date)
    );

    return (
        <LineChart width={500} height={300} data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="total" stroke="#8884d8" />
        </LineChart>
    );
}

export default MonthlyLineChart;