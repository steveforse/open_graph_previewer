import React from 'react';
import { ListGroup, Badge, Card } from 'react-bootstrap';

const UrlList = ({ urls, onSelectUrl }) => {
  if (!urls || urls.length === 0) {
    return (
      <Card className="mt-4">
        <Card.Header>Previously Viewed URLs</Card.Header>
        <Card.Body>
          <p className="text-muted">No URLs have been viewed yet.</p>
        </Card.Body>
      </Card>
    );
  }

  return (
    <Card className="mt-4">
      <Card.Header>Previously Viewed URLs</Card.Header>
      <ListGroup variant="flush">
        {urls.map((url) => (
          <ListGroup.Item 
            key={url.id}
            action
            onClick={() => onSelectUrl(url.url)}
            className="d-flex justify-content-between align-items-center"
          >
            <div className="d-flex flex-column">
              <div className="fw-bold">{url.title || 'No Title'}</div>
              <small className="text-truncate" style={{ maxWidth: '500px' }}>{url.url}</small>
            </div>
            <Badge 
              bg={url.status === 'success' ? 'success' : 'danger'} 
              pill
            >
              {url.status}
            </Badge>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </Card>
  );
};

export default UrlList;
