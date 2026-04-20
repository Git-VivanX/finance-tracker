import { useForm } from "react-hook-form";
import { useContext } from "react";
import { FinanceContext } from "../context/FinanceContext";
import { v4 as uuidv4 } from "uuid";
import { yupResolver } from "@hookform/resolvers/yup";
import { transactionSchema } from "../utils/validationSchema";

function AddTransaction() {
    const { addTransaction } = useContext(FinanceContext);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(transactionSchema),
    });

    const onSubmit = (data) => {
        const newTransaction = {
            id: uuidv4(),
            ...data,
            amount: Number(data.amount),
            date: new Date(data.date),
            recurring: !!data.recurring,
        };

        addTransaction(newTransaction);
        reset();
    };

    return (
        <div className="container">
            <div className="card">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <h2>➕ Add New Transaction</h2>

                    <input 
                        {...register("title")} 
                        placeholder="Transaction title (e.g., Coffee, Salary)" 
                    />
                    {errors.title && <p style={{color: '#f56565'}}>❌ {errors.title.message}</p>}

                    <input 
                        {...register("amount")} 
                        placeholder="Amount" 
                        type="number" 
                        step="0.01"
                    />
                    {errors.amount && <p style={{color: '#f56565'}}>❌ {errors.amount.message}</p>}

                    <select {...register("category")}>
                        <option value="">Select Category</option>
                        <option value="pocket Money">💵 Pocket Money</option>
                        <option value="Food">🍔 Food</option>
                        <option value="Travel">🚗 Travel</option>
                        <option value="Rent">🏠 Rent</option>
                        <option value="Entertainment">🎬 Entertainment</option>
                        <option value="Utilities">💡 Utilities</option>
                        <option value="Other">📦 Other</option>
                    </select>
                    {errors.category && <p style={{color: '#f56565'}}>❌ {errors.category.message}</p>}

                    <input type="date" {...register("date")} />
                    {errors.date && <p style={{color: '#f56565'}}>❌ {errors.date.message}</p>}

                    <select {...register("type")}>
                        <option value="expense">💸 Expense</option>
                        <option value="income">💰 Income</option>
                    </select>
                    {errors.type && <p style={{color: '#f56565'}}>❌ {errors.type.message}</p>}

                    <textarea {...register("notes")} placeholder="Add notes (optional)" rows="4" />

                    <label>
                        <input type="checkbox" {...register("recurring")} />
                        This is a recurring transaction
                    </label>

                    <button type="submit">✨ Add Transaction</button>
                </form>
            </div>
        </div>
    );
}

export default AddTransaction;