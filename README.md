# Open Graph Previewer

A web application that allows users to preview Open Graph data from any supported URL. Built with Rails and React, it's a light-weight application witha simple interface.

## Technical Design

### Architecture

The Open Graph Previewer uses a hybrid architecture combining:

- **Backend**: Ruby on Rails 8.0 API
- **Frontend**: React with Vite
- **Database**: PostgreSQL for data persistence

### Key Components

#### Backend

- **URL Model**: Stores and processes Open Graph data with methods for fetching and refreshing metadata
- **URLs Controller**: Handles API requests and serves the React SPA
- **Serializers**: Uses ActiveModel::Serializers for consistent JSON formatting
- **OGP Gem**: Leverages the OGP gem for parsing Open Graph metadata because I didn't want to use Nokogiri today

#### Frontend

- **React Components**: Modular design with separate components for form input and data display
- **React Bootstrap**: If Bootstrap wasn't invented for this, I don't know what it's for
- **Vite Integration**: Modern build tooling for faster development

## Technical Approach

### Backend Design

The application follows Rails conventions with some adaptations:

1. **Model-focused business logic**: I added ActiveInteraction gem in order to put some of this business logic in a service, but then thought it was a bit overkill.
2. **API-first design**: Controllers return JSON responses for consumption by the React frontend
3. **Serialization layer**: Uses ActiveModel::Serializers because that's what I'm used to
4. **Error handling**: Basic error handling. Didn't want to overcomplicate this.

### Frontend Design

The React frontend is built with component-based architecture:

1. **Component separation**: Modular components with single responsibilities
   - `OpenGraphPreviewer`: Main container component
   - `OpenGraphForm`: Form handling component
   - `OpenGraphCard`: Data display component
2. **State management**: Local React state for UI interactions
3. **Bootstrap integration**: Taking advantage of existing Bootstrap components

## Technical Trade-offs

### Rails + React Integration

- **Pros**: Combines Rails' backend capabilities with React's dynamic UI
- **Cons**: Adds complexity compared to a pure Rails application

### Vite vs Webpacker

- **Pros**: Vite offers faster builds and a more modern development experience
- **Cons**: Newer integration with Rails, potentially less documentation

### OGP Gem vs Custom Parser

- **Pros**: Leverages a dedicated library for Open Graph parsing
- **Cons**: Dependency on external library maintenance

### ActiveModel::Serializers

- **Pros**: Standardized JSON formatting with minimal configuration
- **Cons**: Some performance overhead compared to custom JSON generation. Could've been a PORO.

## Getting Started

### Prerequisites

- Ruby 3.3.0+
- Node.js 18+
- PostgreSQL 14+
- Yarn

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/open_graph_previewer.git
   cd open_graph_previewer
   ```

2. Install dependencies:
   ```
   bundle install
   yarn install
   ```

3. Setup the database:
   ```
   rails db:create db:migrate
   ```

### Running the Application

1. Start the development server:
   ```
   bin/dev
   ```

2. Visit `http://localhost:3000` in your browser

### Running Tests

```
bundle exec rspec
```

## Future Improvements

- Caching for frequently accessed URLs
- Support for user accounts
- Batch URL processing
- Store images locally?

## Stuff that's not release-rady
- More error handling
- Needs react tests
- Needs integration tests
- Not really happy with the URL list component. Needs better functionality.
- Should've put API routes in a separate file. At least one has an API namespace.
