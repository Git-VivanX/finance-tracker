import { useContext } from "react";
import { FinanceContext } from "../context/FinanceContext";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import useDebounce from "../hooks/useDebounce";
import useCurrency from "../hooks/useCurrency";

function Transactions() {
    const { transactions, deleteTransaction } = useContext(FinanceContext);
    const [search, setSearch] = useState("");
    const [categoryFilter, setCategoryFilter] = useState("");
    const [typeFilter, setTypeFilter] = useState("");
    const [sortBy, setSortBy] = useState("");
    const debouncedSearch = useDebounce(search, 500);
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const { convert, loading } = useCurrency();

    const navigate = useNavigate();

    return (
        <div className="container">
            <h2>💰 Transactions</h2>

            <div className="filter-section">
                <h3>Filter & Search</h3>
                <div className="filter-grid">
                    <input
                        type="text"
                        placeholder="Search by title..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />

                    <select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)}>
                        <option value="">All Categories</option>
                        <option value="pocket Money">Pocket Money</option>
                        <option value="Food">Food</option>
                        <option value="Travel">Travel</option>
                        <option value="Rent">Rent</option>
                        <option value="Entertainment">Entertainment</option>
                        <option value="Utilities">Utilities</option>
                        <option value="Other">Other</option>
                    </select>

                    <select value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)}>
                        <option value="">All Types</option>
                        <option value="expense">Expense</option>
                        <option value="income">Income</option>
                    </select>

                    <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                        <option value="">No Sorting</option>
                        <option value="amount">Sort by Amount</option>
                        <option value="date">Sort by Date</option>
                    </select>

                    <input
                        type="date"
                        placeholder="Start Date"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                    />

                    <input
                        type="date"
                        placeholder="End Date"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                    />
                </div>
            </div>

            {transactions.length === 0 ? (
                <div className="empty-state">
                    <p>📝 No transactions yet. Start by adding one!</p>
                </div>
            ) : (
                transactions
                    .filter((t) =>
                        (t.title + (t.notes || ""))
                            .toLowerCase().includes(debouncedSearch.toLowerCase())
                    )
                    .filter((t) =>
                        categoryFilter ? t.category === categoryFilter : true
                    )
                    .filter((t) =>
                        typeFilter ? t.type === typeFilter : true
                    )
                    .filter((t) => {
                        if (!startDate && !endDate) return true;

                        const transactionDate = new Date(t.date);
                        const start = startDate ? new Date(startDate) : null;
                        const end = endDate ? new Date(endDate) : null;

                        return (
                            (!start || transactionDate >= start) &&
                            (!end || transactionDate <= end)
                        );
                    })
                    .sort((a, b) => {
                        if (sortBy === "amount") {
                            return a.amount - b.amount;
                        }
                        if (sortBy === "date") {
                            return new Date(a.date) - new Date(b.date);
                        }
                        return 0;
                    })
                    .map((t) => (
                        <div
                            key={t.id}
                            className={`transaction-card ${t.type.toLowerCase()}`}
                        >
                            <h3>
                                {t.title}
                                {t.recurring && <span className="recurring-badge">🔁 Recurring</span>}
                            </h3>
                            <div className="meta">
                                <div><strong>Amount:</strong> <span className={`amount ${t.type.toLowerCase()}`}>₹{t.amount.toFixed(2)}</span></div>
                                <div><strong>USD:</strong> ${loading ? "..." : convert(t.amount, "USD").toFixed(2)}</div>
                                <div><strong>Category:</strong> {t.category}</div>
                                <div><strong>Date:</strong> {new Date(t.date).toLocaleDateString()}</div>
                            </div>
                            <div className="actions">
                                <button className="edit" onClick={() => navigate(`/transactions/edit/${t.id}`)}>
                                    ✏️ Edit
                                </button>
                                <button className="delete" onClick={() => deleteTransaction(t.id)}>
                                    🗑️ Delete
                                </button>
                            </div>
                        </div>
                    ))
            )}
        </div>
    );
}

export default Transactions;