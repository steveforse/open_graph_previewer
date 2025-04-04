import React from 'react';
import { Card, Row, Col, Button, Alert } from 'react-bootstrap';

const OpenGraphCard = ({ data }) => {
  if (!data) return null;

  return (
    <>
      {data.errorReason && (
        <Alert variant="danger">
          {data.errorReason}
        </Alert>
      )}

      <Card>
        <Card.Header className="bg-primary text-white">
          <h5 className="mb-0">Preview</h5>
        </Card.Header>
        <Card.Body>
          <Row>
            {data.imageUrl && (
              <Col md={4} className="mb-3 mb-md-0">
                <img
                  src={data.imageUrl}
                  alt={data.title || 'Preview image'}
                  className="img-fluid rounded"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = 'https://placehold.co/600x400?text=No+Image';
                  }}
                />
              </Col>
            )}
            <Col md={data.imageUrl ? 8 : 12}>
              <Card.Title>{data.title || 'No Title'}</Card.Title>
              {data.description && (
                <Card.Text>{data.description}</Card.Text>
              )}
              <Button
                href={data.canonicalUrl || data.url}
                variant="outline-primary"
                size="sm"
                target="_blank"
                rel="noopener noreferrer"
              >
                Visit Website
              </Button>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </>
  );
};

export default OpenGraphCard;
