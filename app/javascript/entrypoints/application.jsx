import React from 'react';
import { createRoot } from 'react-dom/client';
import OpenGraphPreviewer from '../components/OpenGraphPreviewer';

// Import React Bootstrap CSS
import 'bootstrap/dist/css/bootstrap.min.css';

document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('open-graph-previewer');
  if (container) {
    const root = createRoot(container);
    root.render(<OpenGraphPreviewer />);
  }
});
