import { useContext } from "react";
import { FinanceContext } from "../context/FinanceContext";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
} from "recharts";

function IncomeExpenseBarChart() {
    const { transactions } = useContext(FinanceContext);

    if (!transactions || transactions.length === 0) {
        return <div className="empty-state"><p>📊 No transaction data available</p></div>;
    }

    let income = 0;
    let expense = 0;

    transactions.forEach((t) => {
        if (t.type.toLowerCase() === "income") {
            income += t.amount;
        } else {
            expense += t.amount;
        }
    });

    const data = [
        { name: "Income", total: income },
        { name: "Expense", total: expense },
    ];

    return (
        <BarChart width={400} height={300} data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="total" fill="#82ca9d" />
        </BarChart>
    );
}

export default IncomeExpenseBarChart;