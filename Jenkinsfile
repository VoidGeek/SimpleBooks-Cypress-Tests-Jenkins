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
                // Install project dependencies (use sh for Linux)
                sh 'npm install'
            }
        }
        
        stage('Run Cypress Tests') {
            steps {
                echo 'Running Cypress Tests with Mochawesome Report...'
                // Run Cypress tests with the mochawesome reporter (use sh for Linux)
                sh 'npx cypress run --reporter mochawesome'
            }
        }
    }

    post {
        always {
            // Archive the test reports as artifacts
            archiveArtifacts artifacts: 'cypress/reports/*.html', allowEmptyArchive: true
            // Publish report as part of the Jenkins build process
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
