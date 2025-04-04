import React, { useState } from 'react';
import { Container } from 'react-bootstrap';
import OpenGraphForm from './OpenGraphForm';
import OpenGraphCard from './OpenGraphCard';

const OpenGraphPreviewer = () => {
  const [ogData, setOgData] = useState(null);

  // Function to get CSRF token from meta tag
  const getCSRFToken = () => {
    const csrfToken = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');
    return csrfToken || '';
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
      return data;
    } catch (err) {
      setOgData({ errorReason: err.message || 'Failed to fetch Open Graph data' });
      throw err;
    }
  };

  return (
    <Container className="mt-5">
      <h1 className="mb-4">Open Graph Previewer</h1>

      <OpenGraphForm onSubmit={fetchOpenGraphData} />

      {ogData && <OpenGraphCard data={ogData} />}
    </Container>
  );
};

export default OpenGraphPreviewer;
