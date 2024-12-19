import { useEffect, useState } from 'react';

const AdminQueries = () => {
  const [queries, setQueries] = useState([]);
  const [currentAnswer, setCurrentAnswer] = useState('');

  const fetchQueries = async () => {
    const res = await fetch(`/api/admin/queries`);
    const data = await res.json();
    setQueries(data);
  };

  const handleAnswer = async (id) => {
    await fetch(`/api/admin/queries/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ answer: currentAnswer })
    });
    setCurrentAnswer('');
    fetchQueries();
  };

  useEffect(() => {
    fetchQueries();
  }, []);

  return (
    <div>
      <h1>Manage Client Queries</h1>
      <table>
        <thead>
          <tr>
            <th>Query</th>
            <th>Answer</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {queries.map((q) => (
            <tr key={q.id}>
              <td>{q.query}</td>
              <td>{q.answer || 'Pending'}</td>
              <td>
                <textarea
                  onChange={(e) => setCurrentAnswer(e.target.value)}
                  placeholder="Type your answer here"
                />
                <button onClick={() => handleAnswer(q.id)}>Submit</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminQueries;
