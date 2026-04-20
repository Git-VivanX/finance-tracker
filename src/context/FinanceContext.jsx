import { createContext, useState, useEffect } from "react";
import { toast } from "react-toastify";

export const FinanceContext = createContext();

export const FinanceProvider = ({ children }) => {
    const [transactions, setTransactions] = useState(() => {
        const saved = localStorage.getItem("transactions");
        return saved ? JSON.parse(saved) : [];
    });

    useEffect(() => {
        localStorage.setItem("transactions", JSON.stringify(transactions));
    }, [transactions]);

    const [budget, setBudget] = useState(() => {
        const saved = localStorage.getItem("budget");
        return saved ? JSON.parse(saved) : 0;
    });

    useEffect(() => {
        localStorage.setItem("budget", JSON.stringify(budget));
    }, [budget]);

    const addTransaction = (transaction) => {
        setTransactions((prev) => [...prev, transaction]);
        toast.success("Transaction added!");
    };

    const deleteTransaction = (id) => {
        const confirmDelete = window.confirm("Are you sure?");
        if (!confirmDelete) return;

        setTransactions((prev) => prev.filter((t) => t.id !== id));
        toast.error("Transaction deleted!");
    };

    const updateTransaction = (updatedTransaction) => {
        setTransactions((prev) =>
            prev.map((t) =>
                t.id === updatedTransaction.id ? updatedTransaction : t
            )
        );
        toast.info("Transaction updated!");
    };

    return (
        <FinanceContext.Provider
            value={{
                transactions,
                addTransaction,
                deleteTransaction,
                updateTransaction,
                budget,
                setBudget,
            }}
        >
            {children}
        </FinanceContext.Provider>
    );
};