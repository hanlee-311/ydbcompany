import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Home = () => {
    const [types, setTypes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [newType, setNewType] = useState('');
    const [message, setMessage] = useState('');
    const [editId, setEditId] = useState(null);

    useEffect(() => {
        const fetchTypes = async () => {
            try {
                const response = await axios.get('/api/types');
                setTypes(response.data);
            } catch (err) {
                setError('Failed to fetch data');
            } finally {
                setLoading(false);
            }
        };

        fetchTypes();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!newType.trim()) {
            setMessage('Please enter a type');
            return;
        }

        try {
            // 🔥 If editing an existing type
            if (editId !== null) {
                const response = await fetch('/api/types', {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        id: editId,
                        type: newType
                    }),
                });

                const result = await response.json();

                if (response.ok) {
                    // Update list locally
                    setTypes(types.map(t =>
                        t.id === editId ? { ...t, type: newType } : t
                    ));

                    setMessage(`Type updated to "${newType}"`);
                } else {
                    setMessage(result.error || 'Update failed');
                }

                setEditId(null);
                setNewType('');
                return;
            }

            // 🔥 If adding a new type
            const response = await fetch('/api/types', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ type: newType }),
            });

            const result = await response.json();

            if (response.ok) {
                setTypes([...types, result]);
                setNewType('');
                setMessage(`Type "${newType}" added successfully!`);
            } else {
                setMessage(result.error || 'Something went wrong');
            }
        } catch (error) {
            setMessage('Error: ' + error.message);
        }
    };

    return (
        <div>
            <h1>Manage Types</h1>

            <form onSubmit={handleSubmit}>
                <label htmlFor="type">Type:</label>

                <input
                    type="text"
                    id="type"
                    value={newType}
                    onChange={(e) => setNewType(e.target.value)}
                />

                <button type="submit">
                    {editId ? 'Update Type' : 'Add Type'}
                </button>

                {editId && (
                    <button
                        type="button"
                        onClick={() => {
                            setEditId(null);
                            setNewType('');
                        }}
                        style={{ marginLeft: '10px' }}
                    >
                        Cancel
                    </button>
                )}
            </form>

            {message && <p>{message}</p>}

            <h2>Existing Types</h2>

            <ul>
                {types.length > 0 ? (
                    types.map((type) => (
                        <li
                            key={type.id}
                            style={{ cursor: 'pointer' }}
                            onClick={() => {
                                setEditId(type.id);
                                setNewType(type.type);
                                setMessage(`Editing "${type.type}"...`);
                            }}
                        >
                            {type.type}
                        </li>
                    ))
                ) : (
                    <p>No types available</p>
                )}
            </ul>
        </div>
    );
};

export default Home;