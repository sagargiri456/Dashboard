import { useEffect, useState } from 'react';

const ClientQueries = ({ clientId }: { clientId: String }) => {
  const [queries, setQueries] = useState([]);
  const [newQuery, setNewQuery] = useState('');

  const fetchQueries = async () => {
    const res = await fetch(`/api/queries?clientId=${clientId}`);
    const data = await res.json();
    setQueries(data);
  };

  const handleSubmit = async () => {
    await fetch('/api/queries', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ clientId: 'CLIENT_ID_HERE', query: newQuery })
    });
    setNewQuery('');
    fetchQueries();
  };

  useEffect(() => {
    fetchQueries();
  }, []);

  return (
    <div>
      <h1>Your Queries</h1>
      <textarea
        value={newQuery}
        onChange={(e) => setNewQuery(e.target.value)}
        placeholder="Ask a query"
      />
      <button onClick={handleSubmit}>Submit</button>
      <div>
        {queries.map((q) => (
          <div key={q.id}>
            <p>
              <strong>Query:</strong> {q.query}
            </p>
            <p>
              <strong>Answer:</strong> {q.answer || 'Pending'}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ClientQueries;
