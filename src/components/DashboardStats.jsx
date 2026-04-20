import { useContext } from "react";
import { FinanceContext } from "../context/FinanceContext";

function DashboardStats() {
    const { transactions } = useContext(FinanceContext);

    if (!transactions || transactions.length === 0) {
        return <div className="empty-state"><p>📝 Start by adding your first transaction!</p></div>;
    }

    let income = 0;
    let expense = 0;

    const categoryMap = {};

    transactions.forEach((t) => {
        if (t.type.toLowerCase() === "income") {
            income += t.amount;
        } else {
            expense += t.amount;

            if (!categoryMap[t.category]) {
                categoryMap[t.category] = 0;
            }

            categoryMap[t.category] += t.amount;
        }
    });

    const balance = income - expense;

    let topCategory = "None";
    let max = 0;

    for (let category in categoryMap) {
        if (categoryMap[category] > max) {
            max = categoryMap[category];
            topCategory = category;
        }
    }

    return (
        <div style={{ marginBottom: "20px" }}>
            <h2>💡 Quick Stats</h2>

            <div className="filters">
                <div className="card">
                    <h3>💰 Total Income</h3>
                    <p style={{ color: '#48bb78' }}>₹{income.toFixed(2)}</p>
                </div>

                <div className="card">
                    <h3>💸 Total Expense</h3>
                    <p style={{ color: '#f56565' }}>₹{expense.toFixed(2)}</p>
                </div>

                <div className="card">
                    <h3>📊 Balance</h3>
                    <p style={{ color: balance >= 0 ? '#48bb78' : '#f56565' }}>₹{balance.toFixed(2)}</p>
                </div>
            </div>
        </div>
    );
}

export default DashboardStats;