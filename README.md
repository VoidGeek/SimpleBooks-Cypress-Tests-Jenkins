
# SimpleBooks API Tests

This project contains automated tests for the SimpleBooks API using Cypress, a JavaScript-based testing framework. The tests cover various CRUD operations on books and orders, ensuring that the API behaves as expected.

## Table of Contents
- [Project Setup](#project-setup)
- [Running Tests](#running-tests)
- [Generating Test Reports](#generating-test-reports)
- [Jenkins Pipeline](#jenkins-pipeline)
- [Folder Structure](#folder-structure)
- [Technologies Used](#technologies-used)
- [License](#license)

## Project Setup

### Prerequisites
- [Node.js](https://nodejs.org/) (v14+ recommended)
- [npm](https://www.npmjs.com/) (Comes with Node.js)
- [Jenkins](https://www.jenkins.io/) for CI/CD (optional)

### Clone the Repository
```bash
git clone https://github.com/your-username/simplebooks-api-tests.git
cd simplebooks-api-tests
```

### Install Dependencies
Run the following command to install all the project dependencies:
```bash
npm install
```

## Running Tests

### Running Cypress in Headless Mode
To run all tests in headless mode, use the following command:
```bash
npx cypress run
```

### Running Cypress in GUI Mode
To open Cypress in the interactive GUI mode:
```bash
npx cypress open
```
This will allow you to see the test execution in real-time and select specific test files to run.

## Generating Test Reports

This project uses **Mochawesome** to generate HTML reports for the Cypress test results. The reports will be stored in `cypress/reports`.

### Generate a Test Report
Run the following command to execute tests and generate a Mochawesome report:
```bash
npx cypress run --reporter mochawesome
```

The generated HTML report can be found in the `cypress/reports` directory.

## Jenkins Pipeline

This project includes a `Jenkinsfile` for automating the test process using Jenkins. The pipeline includes the following stages:

1. **Install Dependencies** - Installs all the required npm packages.
2. **Run Cypress Tests** - Executes all Cypress tests.
3. **Generate Mochawesome Report** - Generates a detailed HTML test report using Mochawesome.

### Setting Up Jenkins
1. **Install Jenkins**: Download and set up Jenkins on your local machine or server.
2. **Create a New Pipeline Job**: Create a new Jenkins pipeline job pointing to this repository.
3. **Run the Pipeline**: Trigger the pipeline to see automated test execution and report generation.

## Folder Structure

```
simplebooks-api-tests/
├── cypress/
│   ├── e2e/                    # Test cases written in Cypress
│   ├── fixtures/               # Test data and fixtures
│   ├── reports/                # Mochawesome test reports
│   ├── screenshots/            # Screenshots taken during test failures
│   └── support/                # Custom commands and setup
├── node_modules/               # Project dependencies (ignored in .gitignore)
├── cypress.config.js           # Cypress configuration file
├── Jenkinsfile                 # Jenkins pipeline configuration
├── package.json                # Project dependencies and scripts
└── package-lock.json           # Version-locked dependency tree
```

## Technologies Used
- **[Cypress](https://www.cypress.io/)**: For end-to-end and API testing.
- **[Mochawesome](https://www.npmjs.com/package/mochawesome)**: For generating HTML reports of test results.
- **[Jenkins](https://www.jenkins.io/)**: For automating test runs in CI/CD pipeline.

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
