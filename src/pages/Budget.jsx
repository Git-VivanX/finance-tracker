import { useContext, useState } from "react";
import { FinanceContext } from "../context/FinanceContext";

function Budget() {
    const { budget, setBudget, transactions } = useContext(FinanceContext);
    const [input, setInput] = useState("");

    const totalExpense = transactions.reduce((sum, t) => {
        if (t.type.toLowerCase() === "expense") {
            return sum + t.amount;
        }
        return sum;
    }, 0);

    let income = 0;

    transactions.forEach((t) => {
        if (t.type.toLowerCase() === "income") {
            income += t.amount;
        }
    });

    const remaining = budget - totalExpense;
    const percentUsed = budget > 0
        ? Math.min((totalExpense / budget) * 100, 100)
        : 0;

    const handleSetBudget = () => {
        setBudget(Number(input));
        setInput("");
    };

    return (
        <div className="container">
            <div className="card">
                <h2>📊 Budget Planner</h2>

                <div style={{ marginBottom: "20px", display: "flex", gap: "12px" }}>
                    <input
                        type="number"
                        placeholder="Enter monthly budget"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        style={{ flex: 1 }}
                    />
                    <button onClick={handleSetBudget}>💾 Set Budget</button>
                </div>

                <div className="stats-box">
                    <p>
                        <strong>💰 Total Income:</strong>
                        <span style={{ color: '#48bb78', fontWeight: '600' }}>₹{income.toFixed(2)}</span>
                    </p>
                    <p>
                        <strong>💳 Total Budget:</strong>
                        <span style={{ fontWeight: '600' }}>₹{budget.toFixed(2)}</span>
                    </p>
                    <p>
                        <strong>💸 Spent:</strong>
                        <span style={{ color: '#f56565', fontWeight: '600' }}>₹{totalExpense.toFixed(2)}</span>
                    </p>
                    <p>
                        <strong>✅ Remaining:</strong>
                        <span style={{ color: remaining >= 0 ? '#48bb78' : '#f56565', fontWeight: '600' }}>₹{Math.abs(remaining).toFixed(2)}</span>
                    </p>
                </div>

                <div className="progress-container">
                    <div className="progress-label">
                        <span>Budget Usage</span>
                        <span style={{ color: '#667eea', fontWeight: '700' }}>{percentUsed.toFixed(1)}%</span>
                    </div>
                    <div className="progress-bar">
                        <div
                            className={`progress-fill ${
                                percentUsed > 100 ? 'danger' :
                                    percentUsed > 80 ? 'warning' :
                                        ''
                            }`}
                            style={{ width: `${Math.min(percentUsed, 100)}%` }}
                        />
                    </div>
                    <p style={{ fontSize: '13px', color: '#718096', margin: '8px 0 0 0' }}>
                        {percentUsed > 100 
                            ? `⚠️ You've exceeded budget by ₹${(totalExpense - budget).toFixed(2)}`
                            : `You have ₹${remaining.toFixed(2)} left to spend`
                        }
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Budget;