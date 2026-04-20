import { useParams, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { useForm } from "react-hook-form";
import { FinanceContext } from "../context/FinanceContext";

function EditTransaction() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { transactions, updateTransaction } = useContext(FinanceContext);

  const transaction = transactions.find((t) => t.id === id);

  const { register, handleSubmit } = useForm({
    defaultValues: transaction,
  });

  const onSubmit = (data) => {
    updateTransaction({
      ...transaction,
      ...data,
      amount: Number(data.amount),
    });
    navigate("/transactions");
  };

  if (!transaction) {
    return <p>Transaction not found</p>;
  }

  return (
    <div className="container">
      <div className="card">
        <form onSubmit={handleSubmit(onSubmit)}>
          <h2>✏️ Edit Transaction</h2>

          <label htmlFor="title"><strong>Title</strong></label>
          <input id="title" {...register("title")} placeholder="Transaction title" />

          <label htmlFor="amount"><strong>Amount</strong></label>
          <input id="amount" {...register("amount")} type="number" step="0.01" placeholder="Amount" />

          <label htmlFor="category"><strong>Category</strong></label>
          <select id="category" {...register("category")}>
            <option value="Food">🍔 Food</option>
            <option value="Travel">🚗 Travel</option>
            <option value="Rent">🏠 Rent</option>
            <option value="Entertainment">🎬 Entertainment</option>
            <option value="Utilities">💡 Utilities</option>
            <option value="Other">📦 Other</option>
          </select>

          <label htmlFor="date"><strong>Date</strong></label>
          <input id="date" type="date" {...register("date")} />

          <label htmlFor="type"><strong>Type</strong></label>
          <select id="type" {...register("type")}>
            <option value="expense">💸 Expense</option>
            <option value="income">💰 Income</option>
          </select>

          <label htmlFor="notes"><strong>Notes</strong></label>
          <textarea id="notes" {...register("notes")} placeholder="Add notes (optional)" rows="4" />

          <button type="submit">💾 Update Transaction</button>
        </form>
      </div>
    </div>
  );
}

export default EditTransaction;