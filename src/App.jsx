import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import AddTransaction from "./pages/AddTransaction";
import Transactions from "./pages/Transactions";
import EditTransaction from "./pages/EditTransaction";
import Budget from "./pages/Budget";
import Currency from "./pages/Currency";
import Analytics from "./pages/Analytics";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <BrowserRouter>
      <nav className="navbar">
        <Link to="/">Dashboard</Link>
        <Link to="/transactions/new">Add Transaction</Link>
        <Link to="/transactions">Transactions</Link>
        <Link to="/budget">Budget</Link>
        <Link to="/currency">Currency</Link>
        <Link to="/analytics">Analytics</Link>
      </nav>

        <Routes>
          <Route path="/transactions" element={<Transactions />} />
          <Route path="/transactions/new" element={<AddTransaction />} />
          <Route
            path="/transactions/edit/:id"
            element={<EditTransaction />}
          />
          <Route path="/" element={<Dashboard />} />
          <Route path="/budget" element={<Budget />} />
          <Route path="/currency" element={<Currency />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>

        <ToastContainer
          position="top-right"
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          pauseOnHover
          draggable
          theme="dark"
        />
    </BrowserRouter>

  );
}

export default App;