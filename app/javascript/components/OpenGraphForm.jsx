import React, { useState } from 'react';
import { Form, Button, Spinner } from 'react-bootstrap';

const OpenGraphForm = ({ onSubmit }) => {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!url) return;
    
    setLoading(true);
    
    try {
      await onSubmit(url);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form onSubmit={handleSubmit} className="mb-4">
      <Form.Group className="mb-3">
        <div className="d-flex">
          <Form.Control
            type="url"
            placeholder="Enter a URL (e.g., https://example.com)"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            required
          />
          <Button 
            variant="primary" 
            type="submit"
            disabled={loading}
            className="ms-2"
          >
            {loading ? (
              <>
                <Spinner animation="border" size="sm" className="me-2" />
                Loading...
              </>
            ) : (
              'Preview'
            )}
          </Button>
        </div>
      </Form.Group>
    </Form>
  );
};

export default OpenGraphForm;
