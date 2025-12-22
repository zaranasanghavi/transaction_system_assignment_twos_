import { useState } from "react";
import api from "../api";

export default function TransferForm({ onSuccess }) {
  const [receiverId, setReceiverId] = useState("");
  const [amount, setAmount] = useState("");
  const [error, setError] = useState("");

const submitTransfer = async (e) => {
  e.preventDefault();
  setError("");

  try {
    const res = await api.post("transfer/", {
      receiver_id: receiverId,
      amount: amount,
    });

    setReceiverId("");
    setAmount("");
    
    // pass updated balance to dashboard
    onSuccess(res.data.balance);
  } catch (err) {
    setError(err.response?.data?.error || "Transfer failed");
  }
};


  return (
    <form onSubmit={submitTransfer}>
      <h3>Transfer Money</h3>

      <input
        placeholder="Receiver ID"
        value={receiverId}
        onChange={(e) => setReceiverId(e.target.value)}
        required
      />

      <input
        placeholder="Amount"
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        required
      />

      <button type="submit">Send</button>

      {error && <p style={{ color: "red" }}>{error}</p>}
    </form>
  );
}
