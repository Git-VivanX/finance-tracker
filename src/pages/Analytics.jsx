import CategoryPieChart from "../components/CategoryPieChart";
import MonthlyLineChart from "../components/MonthlyLineChart";
import IncomeExpenseBarChart from "../components/IncomeExpenseBarChart";

function Analytics() {
  return (
    <div className="container"> 
      <h1>📊 Analytics & Reports</h1>

      <div className="chart-container">
        <CategoryPieChart />
      </div>
      <div className="chart-container">
        <MonthlyLineChart />
      </div>
      <div className="chart-container">
        <IncomeExpenseBarChart />
      </div>
    </div>
  );
}

export default Analytics;