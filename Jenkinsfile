pipeline {
    agent any

    environment {
        PROJECT_NAME = 'brainly-app'
    }

    stages {
        stage(' Clone Repository') {
            steps {
                 git branch: 'main', url: 'https://github.com/harshitduttshukla/dockerProject2.git'
            }
        }

        stage(' Build Docker Images') {
            steps {
                script {
                    bat 'docker-compose build'
                }
            }
        }

        stage(' Run Services') {
            steps {
                script {
                    bat 'docker-compose up -d '
                }
            }
        }

        stage('Test App') {
            steps {
                echo 'Optional: Add test scripts here'
                // For example: sh 'docker exec backend npm test'
            }
        }

        stage(' Tear Down') {
            steps {
                script {
                    bat 'docker-compose down'
                }
            }
        }
    }

    post {
        always {
            echo '✅ Pipeline finished.'
        }
    }
}
