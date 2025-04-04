import React, { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import OpenGraphForm from './OpenGraphForm';
import OpenGraphCard from './OpenGraphCard';
import UrlList from './UrlList';

const OpenGraphPreviewer = () => {
  const [ogData, setOgData] = useState(null);
  const [urls, setUrls] = useState([]);

  // Function to get CSRF token from meta tag
  const getCSRFToken = () => {
    const csrfToken = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');
    return csrfToken || '';
  };

  // Fetch all URLs when component mounts
  useEffect(() => {
    fetchUrls();
  }, []);

  // Fetch all URLs from the API
  const fetchUrls = async () => {
    try {
      const response = await fetch('/urls', {
        headers: {
          'X-CSRF-Token': getCSRFToken(),
        },
      });
      const data = await response.json();
      setUrls(data);
    } catch (err) {
      console.error('Error fetching URLs:', err);
    }
  };

  const fetchOpenGraphData = async (url) => {
    try {
      const response = await fetch('/api/fetch_open_graph', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-Token': getCSRFToken(),
        },
        body: JSON.stringify({ url }),
      });

      const data = await response.json();
      setOgData(data);

      // Refresh the URL list after adding a new URL
      fetchUrls();

      return data;
    } catch (err) {
      setOgData({ errorReason: err.message || 'Failed to fetch Open Graph data' });
      throw err;
    }
  };

  // Handle selecting a URL from the list
  const handleSelectUrl = (url) => {
    // Reuse the fetchOpenGraphData function to load the selected URL
    fetchOpenGraphData(url);
  };

  return (
    <Container className="mt-5">
      <h1 className="mb-4">Open Graph Previewer</h1>

      <OpenGraphForm onSubmit={fetchOpenGraphData} />

      {ogData && <OpenGraphCard data={ogData} />}

      <UrlList urls={urls} onSelectUrl={handleSelectUrl} />
    </Container>
  );
};

export default OpenGraphPreviewer;
