pipeline {
    agent any
    
    tools { nodejs "NodeJs20"}
    stages {
        stage('Checkout') {
            steps {
                // Checkout code from your Git repository
                git branch: 'main', url: 'https://github.com/zahidcse98/appdevs-cypress.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                // Install Node.js dependencies
                bat 'npm install'
            }
        }

        stage('Run Cypress Tests') {
            steps {
                // Run Cypress tests
                bat 'npx cypress run --headless'
            }
        }

        
        stage('Publish Report') {
            steps {
                // Archive the test results and reports
                archiveArtifacts artifacts: 'cypress/reports/**/*', allowEmptyArchive: true

                // Publish the HTML report
                publishHTML(target: [
                    reportDir: 'cypress/reports/',
                    reportFiles: '*.html',
                    reportName: "${env.CYPRESS_PROJECT_NAME} Test Report",
                    alwaysLinkToLastBuild: true,
                    keepAll: true
                ])
            }
        }
    }

    post {
        always {
            script {
                emailext (
                    to: 'zahidappdevs@gmail.com',
                    subject: "${env.JOB_NAME} - Build #${env.BUILD_NUMBER} - ${currentBuild.currentResult}",
                    body: """
                        <p>Build Report for ${env.JOB_NAME} - Build #${env.BUILD_NUMBER}:</p>
                        <p>Status: ${currentBuild.currentResult}</p>
                        <p>View the detailed test report <a href="${env.BUILD_URL}cypress/reports/html/mochawesome.html">here</a>.</p>
                    """,
                    mimeType: 'text/html',
                    attachLog: true
                )
            }
            
            // Clean up the workspace after the build
            cleanWs()
        }
    }
}