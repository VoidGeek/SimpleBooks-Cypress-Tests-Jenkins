pipeline {
    agent any // Use any available Jenkins agent

    environment {
        CYPRESS_CACHE_FOLDER = "${WORKSPACE}/.cache/Cypress" // Cache Cypress to speed up builds
    }

    stages {
        stage('Install Dependencies') {
            steps {
                echo 'Installing npm dependencies...'
                // Install project dependencies
                sh 'npm install'
            }
        }
        
        stage('Run Cypress Tests') {
            steps {
                echo 'Running Cypress Tests...'
                // Run Cypress tests headlessly
                sh 'npx cypress run'
            }
        }
        
        stage('Generate Report') {
            steps {
                echo 'Generating Mochawesome Report...'
                // Generate the Mochawesome report
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
