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
- **Playwright** - End-to-end testing framework

### Styling
- **PostCSS** - CSS processing
- **BEM Methodology** - Block Element Modifier naming convention
- **CSS Modules** - Scoped CSS with nested support

### Data Management
- **React Query** - Data fetching and caching
- **Axios** - HTTP client for API requests

### API Integration
- **JSONPlaceholder** - Free fake API for testing and prototyping

---

## Project Structure

```
src/
├── components/     # React components
├── hooks/          # Custom React hooks
├── services/       # API and service integrations
├── types/          # TypeScript type definitions
└── styles/         # Global styles and PostCSS configuration
```

---

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

---

## Scripts and Their Usage

### Development
- **`yarn dev`**  
  Starts the development server on port `3000` with hot module replacement (HMR) enabled.

- **`yarn preview`**  
  Serves the production build locally for previewing the app.

### Build
- **`yarn build`**  
  Builds the application for production. This includes TypeScript compilation and bundling with Vite.

### Testing
- **`yarn test:unit`**  
  Runs all unit tests using Vitest with coverage enabled.

- **`yarn test:watch`**  
  Runs unit tests in watch mode for faster feedback during development.

- **`yarn test:e2e`**  
  Runs all end-to-end tests using Playwright.

- **`yarn test:e2e:ui`**  
  Opens the Playwright Test Runner UI for debugging and running tests interactively.

- **`yarn test:e2e:codegen`**  
  Launches Playwright's codegen tool to record user interactions and generate test scripts. Use this to quickly scaffold E2E tests:
  ```bash
  yarn test:e2e:codegen http://localhost:3000
  ```

### Linting
- **`yarn lint`**  
  Runs ESLint to check for code quality and style issues.

- **`yarn lint:fix`**  
  Runs ESLint and automatically fixes fixable issues.

### Type Checking
- **`yarn typecheck`**  
  Runs TypeScript's type checker to ensure type correctness without emitting files.

### Documentation
- **`yarn docs`**  
  Generates project documentation using TypeDoc and outputs it to the `docs` directory.

- **`yarn docs:watch`**  
  Watches for changes and regenerates documentation in real-time.

---

## Development Features

- **Hot Module Replacement** - Instant updates during development
- **Type Checking** - Real-time TypeScript type checking
- **Documentation Generation** - Automatic API documentation with TypeDoc
- **Testing Setup** - Pre-configured with Vitest, React Testing Library, and Playwright
- **CSS Modules** - Scoped styling with BEM methodology
- **API Mocking** - Easy API mocking for testing

---

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

---

## Testing

The project uses Vitest, React Testing Library, and Playwright for testing.

### Unit Tests
Run unit tests with:
```bash
yarn test:unit
```

```bash
yarn test:unit --watch src/components/PostDetail
```

### End-to-End Tests
Run E2E tests with:
```bash
yarn test:e2e
```

### Debugging E2E Tests
Use the Playwright Test Runner UI:
```bash
yarn test:e2e:ui
```

Generate E2E tests using Playwright Codegen:
```bash
yarn test:e2e:codegen http://localhost:3000
```

---

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

---

## API Integration

The project uses JSONPlaceholder API for demonstration purposes. API calls are handled through Axios and managed with React Query for efficient data fetching and caching.

---

## License

This project is licensed under the MIT License - see the LICENSE file for details.
