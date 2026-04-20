import { useContext } from "react";
import { FinanceContext } from "../context/FinanceContext";
import { PieChart, Pie } from "recharts";

function CategoryPieChart() {
  const { transactions } = useContext(FinanceContext);

  if (!transactions || transactions.length === 0) {
    return <div className="empty-state"><p>📊 No transaction data available</p></div>;
  }

  return (
    <PieChart width={400} height={400}>
      <Pie data={transactions} dataKey="amount" nameKey="title" />
    </PieChart>
  );
}

export default CategoryPieChart;