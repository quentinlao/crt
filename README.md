# CRT (Create React Template)

A custom React application template built with modern tooling and best practices.

---

## Technology Stack

### Core

- **React** - JavaScript library for building user interfaces.
- **TypeScript** - Static typing for JavaScript, ensuring type safety and better developer experience.
- **Yarn** - Package manager (v4.0.2 with PnP) for dependency management.

### Development Tools

- **ESLint** - Code linting and style enforcement to maintain code quality.
- **TypeDoc** - Documentation generator for TypeScript projects.
- **Vitest** - A fast and lightweight testing framework for unit and integration tests.
- **React Testing Library** - Utilities for testing React components in a user-centric way.
- **Playwright** - End-to-end testing framework for browser automation.

### Styling

- **PostCSS** - CSS processing with modern features.
- **BEM Methodology** - Block Element Modifier naming convention for consistent and maintainable CSS.
- **CSS Modules** - Scoped CSS with support for nesting and modular styles.

### Data Management

- **React Query** - A powerful library for data fetching, caching, and synchronization.

### API Integration

- **JSONPlaceholder** - A free fake API used for testing and prototyping.

---

## Project Structure

```
src/
├── components/     # Reusable React components
├── hooks/          # Custom React hooks
├── services/       # API and service integrations
├── types/          # TypeScript type definitions
├── styles/         # Global styles and PostCSS configuration
└── tests/          # Test utilities and mocks
```

---

## Getting Started

1. Install dependencies:
   ```bash
   yarn install
   ```

2. Start the development server:
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
  Launches Playwright's codegen tool to record user interactions and generate test scripts:
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

- **`yarn docs:open`**  
  Opens the generated documentation (`docs/index.html`) in the default browser.

---

## GitHub Workflows

### Playwright Tests

A GitHub Actions workflow is configured to run Playwright end-to-end tests on every push or pull request to the `main` or `master` branches. The workflow installs dependencies, sets up Playwright, and runs the tests.

### Unit Tests

Another GitHub Actions workflow is configured to run unit tests using Vitest. It ensures that all unit tests pass on every push or pull request to the `main` or `master` branches.

---

## Development Features

- **Hot Module Replacement** - Instant updates during development.
- **Type Checking** - Real-time TypeScript type checking.
- **Documentation Generation** - Automatic API documentation with TypeDoc.
- **Testing Setup** - Pre-configured with Vitest, React Testing Library, and Playwright.
- **CSS Modules** - Scoped styling with BEM methodology.
- **API Mocking** - Easy API mocking for testing.

---

## Routing

The project uses **React Router v7** for client-side routing. Key features include:

- **Nested Routes** - Organize routes hierarchically.
- **Dynamic Parameters** - Access route parameters using `useParams`.
- **Route Guards** - Protect routes with authentication.
- **Lazy Loading** - Load routes on demand for better performance.
- **Memory Router** - Test routes in isolation.

### Route Structure

```
/                   # Home page with post list
/posts/:id          # Individual post detail page
```

---

## Testing

The project uses Vitest, React Testing Library, and Playwright for testing.

### Unit Tests

Run unit tests with:
```bash
yarn test:unit
```

Run specific tests in watch mode:
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

- **BEM Methodology** - Consistent and maintainable CSS class naming.
- **CSS Modules** - Scoped styles for components.
- **PostCSS** - Modern CSS features with support for nesting.
- **Responsive Design** - Mobile-first approach with the following breakpoints:
  - Mobile: `< 768px`
  - Tablet: `768px - 1024px`
  - Desktop: `> 1024px`

---

## API Integration

The project uses **JSONPlaceholder** as a mock API for demonstration purposes. API calls are handled using the native `fetch` API and managed with **React Query** for efficient data fetching and caching.

---

## License

This project is licensed under the MIT License - see the LICENSE file for details.