// src/components/Home.jsx

import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Home = () => {
  const [types, setTypes] = useState([]);  // State to hold the fetched types
  const [loading, setLoading] = useState(true);  // State to manage loading state
  const [error, setError] = useState(null);  // State for handling any error during fetch

  // Fetch data on component mount
  useEffect(() => {
    const fetchTypes = async () => {
      try {
        const response = await axios.get('/api/types');  // Fetch data from your backend API
        setTypes(response.data);  // Store the fetched data in state
      } catch (err) {
        setError('Failed to fetch data');  // Set error state if the API call fails
      } finally {
        setLoading(false);  // Stop loading indicator
      }
    };

    fetchTypes();
  }, []);  // Empty dependency array ensures the effect runs only once when the component mounts

  // If still loading, show a loading message
  if (loading) {
    return <div>Loading...</div>;
  }

  // If there was an error fetching data, show the error message
  if (error) {
    return <div>{error}</div>;
  }

  // Render the fetched data
  return (
    <div>
      <h1>Types List</h1>
      <ul>
        {types.map((type) => (
          <li key={type.id}>
            {type.type} {/* Render the 'type' field from the database */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
