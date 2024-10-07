# Intenseye Frontend Case Study by Guilherme Monte

## Summary
- [Challenge Description](#challenge-description)
- [Online Demo](#online-demo)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Project Scripts](#project-scripts)
  - [Technologies Used](#technologies-used)
- [Private Repository](#private-repository)
  - [GitHub Action](#github-action)

## Challenge Description
This project was made as a technical test for Intenseye Frontend Engineer position.

#### Requirements:

- On the page, the user will be greeted by a table.
- The table should have 3 radio buttons where the user can select between three programming languages: JavaScript, Scala, Python.
- The JavaScript radio button will be pre-selected.
- There will be a search input where users can search repositories based on keywords.
- The search will use the query in the input combined with the selected language.
- Search input will not have a submit button; instead, it will automatically fetch the results based on user input changes.
- Table headers must consist of Repository ID, Username, Repo Description, Stars, Forks, and Last Update Date.
- Sorting functionality must be implemented for stars, forks, and the last update date. You can only sort by one column at a time.
- The table must have pagination implemented.
- When sorting changes, new data must be fetched from the server. It should not be done on the client side.
- The application should remember the state when the user closes the page. So the next time the user opens the page, they must be greeted by the last changes they have made.
- Lastly, the page should be fully responsive and accessible on mobile.

#### Bonus:
- Using React
- Using TypeScript
- Using CSS Modules
- Deploying the application on a website
- Good design
- Testing
- Login functionality using Authorizations | GitHub Developer Guide


## Online Demo
The project is live and accessible online at [https://github-repos-e659e.web.app/](https://github-repos-e659e.web.app/). It is hosted using Firebase Hosting, providing a fast and secure environment for users to explore the application's features.

## Getting Started

### Prerequisites
Before you begin, ensure you have the following software installed on your machine:

- **Node.js** (LTS/Iron)
  - If you're using `nvm`, you can install it with:
    ```bash
    nvm install lts/iron
    ```
    Then, run `nvm use` in the project root to switch to the correct version.

- **pnpm** (v9.11.0)
  - To install `pnpm`, follow these steps:
    ```bash
    corepack enable
    corepack prepare pnpm@9.11.0 --activate
    ```

- **GitHub Access Token**
  - A GitHub Access Token is recommended for increasing the limit of requests to the GitHub API. You can generate a token by following the instructions in the [GitHub documentation](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token). Ensure the token has the `public_repo` scope for accessing public repositories; 
  - To use the token, copy the `.env.example` file to a new file named `.env` and set the token in the `.env` file as `VITE_GITHUB_TOKEN="<your_personal_access_token>"`.


### Project Scripts
The following scripts are available for managing the project:

- `pnpm install`: Installs all dependencies.
- `pnpm dev`: Starts the Vite development server.
- `pnpm build`: Creates a production-ready build.
- `pnpm test`: Runs all tests using Vitest.


### Technologies Used

This project utilizes a variety of technologies and libraries, summarized below:

#### Dependencies
- **`@phosphor-icons/react`**: A collection of icons for React applications.
- **`@radix-ui/react-radio-group`**: A set of accessible radio group components for React.
- **`@radix-ui/react-select`**: A customizable select component for React.
- **`@radix-ui/react-tooltip`**: Tooltip components for enhanced accessibility and UX in React.
- **`@tanstack/react-query`**: A powerful library for data fetching and state management in React.
- **`class-variance-authority`**: A utility for managing class variations in React components.
- **`date-fns`**: A lightweight date library for parsing, formatting, and manipulating dates.
- **`lodash`**: A modern JavaScript utility library delivering modularity, performance, and extras.
- **`react`**: A popular JavaScript library for building user interfaces.
- **`react-dom`**: The entry point for working with the DOM in React.
- **`reset-css`**: A CSS reset stylesheet to ensure consistent styling across browsers.
- **`use-debounce`**: A custom React hook for debouncing values.
- **`zustand`**: A small, fast state management solution for React applications.

#### DevDependencies
- **`@csstools/postcss-global-data`**: A PostCSS plugin for handling global data.
- **`@testing-library/jest-dom`**: Custom jest matchers for asserting on DOM nodes.
- **`@testing-library/react`**: Testing utilities for React components.
- **`commitlint`**: A tool for linting commit messages.
- **`commitizen`**: A tool for writing conventional commit messages.
- **`husky`**: A tool for managing Git hooks.
- **`jsdom`**: A JavaScript implementation of the DOM for use in testing.
- **`lint-staged`**: A tool for running linters on pre-committed files.
- **`postcss`**: A tool for transforming CSS with JavaScript plugins.
- **`stylelint`**: A modern CSS linter for enforcing consistent conventions.
- **`type-fest`**: A collection of utility types for TypeScript.
- **`typescript`**: A superset of JavaScript that adds static types.
- **`unplugin-fonts`**: A Vite plugin for handling custom fonts.
- **`vite`**: A build tool that aims to provide a faster and leaner development experience.
- **`vitest`**: A testing framework built for Vite, providing a fast and efficient way to test code.


## Private Repository

This project is hosted in a private GitHub repository. To ensure code quality and application functionality, I have implemented a GitHub Action that automates the testing and deployment process.

### GitHub Action

The action is triggered on each merge to the `main` branch and performs the following steps:

1. **Checkout**: Clones the repository.
2. **Node.js Setup**: Configures the environment with the correct Node.js version.
3. **Install Dependencies**: Uses `pnpm` to install the project's dependencies.
4. **Run Tests**: Executes tests using `vitest` to ensure all functionalities are working as expected.
5. **Build Application**: Generates the production version of the application.
6. **Deploy to Firebase Hosting**: Deploys the application to Firebase Hosting.

This setup enables a continuous development cycle and ensures that code changes are automatically tested before deployment.

