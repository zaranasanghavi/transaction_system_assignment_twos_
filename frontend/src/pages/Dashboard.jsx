import { useEffect, useState } from "react";
import api from "../api";
import TransferForm from "../components/TransferForm";
import HistoryTable from "../components/HistoryTable";
import { getTokenExpiry } from "../auth";

export default function Dashboard() {
  const [history, setHistory] = useState([]);
  const [balance, setBalance] = useState(0); // <-- add balance state
  

  const fetchHistory = async () => {
    const res = await api.get("history/");
    setHistory(res.data);
  };
 useEffect(() => {
  const fetchData = async () => {
    const res = await api.get("history/");
    setHistory(res.data);
    calculateBalance(res.data); // recalc balance for logged-in user
  };

  fetchData(); // initial fetch

  const interval = setInterval(fetchData, 5000); // fetch every 5 seconds
  return () => clearInterval(interval);
}, []);


  const fetchBalance = async () => {
    // Optional: create a balance API, or get from first transfer for demo
    const res = await api.get("history/");
    let latestBalance = 0;
    if (res.data.length) {
      // calculate sender's balance by summing credits/debits
      res.data.forEach(t => {
        if (t.sender === parseInt(localStorage.getItem("user_id"))) latestBalance -= t.amount;
        if (t.receiver === parseInt(localStorage.getItem("user_id"))) latestBalance += t.amount;
      });
    }
    setBalance(latestBalance);
  };

  useEffect(() => {
    fetchHistory();
    fetchBalance();
  }, []);

  const expiry = new Date(getTokenExpiry(localStorage.getItem("access")));

  return (
    <div>
      <h2>Dashboard</h2>
      <p>Token expires at: {expiry.toLocaleTimeString()}</p>

      <TransferForm
        onSuccess={(newBalance) => {  // <-- pass updated balance
          fetchHistory();
          if (newBalance !== undefined) setBalance(newBalance);
        }}
      />
      

      <HistoryTable transactions={history} />
    </div>
  );
}
