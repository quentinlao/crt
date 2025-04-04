# CRT (Custom React Template)

A custom React application template built with modern tooling and best practices.

## Technology Stack

### Core
- **React** - JavaScript library for building user interfaces
- **TypeScript** - Static typing for JavaScript
- **Yarn** - Package manager (v4.0.2 with PnP)

### Development Tools
- **ESLint** - Code linting and style enforcement
- **TypeDoc** - Documentation generator for TypeScript projects
- **Vitest** - Testing framework
- **React Testing Library** - Testing utilities for React components

### Styling
- **PostCSS** - CSS processing
- **BEM Methodology** - Block Element Modifier naming convention
- **CSS Modules** - Scoped CSS with nested support

### Data Management
- **React Query** - Data fetching and caching
- **Axios** - HTTP client for API requests

### API Integration
- **JSONPlaceholder** - Free fake API for testing and prototyping

## Project Structure

```
src/
├── components/     # React components
├── hooks/         # Custom React hooks
├── services/      # API and service integrations
├── types/         # TypeScript type definitions
└── styles/        # Global styles and PostCSS configuration
```

## Getting Started

1. Install dependencies:
   ```bash
   yarn install
   ```

2. Start development server:
   ```bash
   yarn dev
   ```

3. Run tests:
   ```bash
   yarn test
   ```

4. Generate documentation:
   ```bash
   yarn docs
   ```

5. Lint code:
   ```bash
   yarn lint
   ```

## Development Features

- **Hot Module Replacement** - Instant updates during development
- **Type Checking** - Real-time TypeScript type checking
- **Documentation Generation** - Automatic API documentation with TypeDoc
- **Testing Setup** - Pre-configured with Vitest and React Testing Library
- **CSS Modules** - Scoped styling with BEM methodology
- **API Mocking** - Easy API mocking for testing
- **React Router** - Client-side routing with nested routes and dynamic parameters

## Routing

The project uses React Router v7 for client-side routing. Key features include:

- **Nested Routes** - Organize routes hierarchically
- **Dynamic Parameters** - Access route parameters using `useParams`
- **Route Guards** - Protect routes with authentication
- **Lazy Loading** - Load routes on demand for better performance
- **Memory Router** - Test routes in isolation

### Route Structure

```
/                   # Home page with post list
/posts/:id          # Individual post detail page
```

### Testing Routes

When testing components that use React Router:

1. Use `MemoryRouter` instead of `BrowserRouter`
2. Provide initial routes and entries
3. Wrap components with necessary context providers

Example test setup:
```typescript
const renderWithRouter = (ui: React.ReactElement, { route = "/" } = {}) => {
  return render(
    <QueryClientProvider client={queryClient}>
      <MemoryRouter initialEntries={[route]}>
        <Routes>
          <Route path="/" element={ui} />
        </Routes>
      </MemoryRouter>
    </QueryClientProvider>
  );
};
```

## Documentation

Project documentation is generated using TypeDoc and can be found in the `docs` directory. To generate documentation:

```bash
yarn docs
```

For live documentation updates during development:

```bash
yarn docs:watch
```

## Testing

The project uses Vitest and React Testing Library for testing. Tests are located in files with `.test.ts` or `.test.tsx` extensions.

```bash
# Run tests
yarn test

# Run tests in watch mode
yarn test:watch
```

## Styling Guidelines

- Uses BEM methodology for CSS class naming
- CSS Modules for component-scoped styles
- PostCSS for modern CSS features
- Nested CSS support for better organization
- Media Queries:
  - Mobile-first approach for responsive design
  - Breakpoints:
    - Mobile: < 768px
    - Tablet: 768px - 1024px
    - Desktop: > 1024px
  - Use `@media` queries with `min-width` for progressive enhancement
  - Keep media queries close to their related styles using nested syntax
  - Use CSS custom properties for consistent breakpoint values

## API Integration

The project uses JSONPlaceholder API for demonstration purposes. API calls are handled through Axios and managed with React Query for efficient data fetching and caching.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
