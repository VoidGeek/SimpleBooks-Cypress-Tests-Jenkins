pipeline {
    agent any

    environment {
        // Set Cypress cache folder
        CYPRESS_CACHE_FOLDER = "${WORKSPACE}/.cache/Cypress"
        // Fix XDG_RUNTIME_DIR for Cypress
        XDG_RUNTIME_DIR = '/tmp'
    }

    stages {
        stage('Clear Cypress Cache') {
            steps {
                echo 'Clearing Cypress cache...'
                // Clear Cypress cache before installing dependencies
                sh 'npx cypress cache clear'
            }
        }

        stage('Install Dependencies') {
            steps {
                echo 'Installing npm dependencies...'
                // Install project dependencies
                sh 'npm install'
            }
        }
        
        stage('Install Cypress Binary') {
            steps {
                echo 'Installing Cypress binary...'
                // Install Cypress binary separately to ensure it is downloaded
                sh 'npx cypress install'
            }
        }

        stage('Run Cypress Tests') {
            steps {
                echo 'Running Cypress Tests with Mochawesome Report...'
                // Run Cypress tests with the mochawesome reporter
                sh 'npx cypress run --reporter mochawesome'

                // Debug: List the contents of the reports directory
                echo 'Listing contents of cypress/reports...'
                sh 'ls -l cypress/reports'
                // If assets are in a subdirectory, list that as well
                sh 'ls -l cypress/reports/assets || echo "No assets directory"'
            }
        }
    }

    post {
        always {
            // Archive the test reports as artifacts, including all files
            echo 'Archiving artifacts...'
            archiveArtifacts artifacts: 'cypress/reports/**/*', allowEmptyArchive: true
            echo 'Pipeline completed, artifacts archived.'
        }
        success {
            echo 'Pipeline completed successfully!'
        }
        failure {
            echo 'Pipeline failed.'
        }
    }
}
