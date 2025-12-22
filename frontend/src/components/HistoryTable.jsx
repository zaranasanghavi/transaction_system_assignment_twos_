export default function HistoryTable({ transactions }) {
  return (
    <div>
      <h3>Transaction History</h3>

      <table border="1">
        <thead>
          <tr>
            <th>ID</th>
            <th>Amount</th>
            <th>Sender</th>
            <th>Receiver</th>
            <th>Time</th>
          </tr>
        </thead>

        <tbody>
          {transactions.map((t) => (
            <tr key={t.id}>
              <td>{t.id}</td>
              <td>{t.amount}</td>
              <td>{t.sender}</td>
              <td>{t.receiver}</td>
              <td>{new Date(t.created_at).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
