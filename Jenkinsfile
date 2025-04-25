pipeline {
    agent any

    environment {
        PROJECT_NAME = 'brainly-app'
    }

    stages {
        stage('📦 Clone Repository') {
            steps {
                git 'https://github.com/harshitduttshukla/dockerProject2.git'
            }
        }

        stage('🐳 Build Docker Images') {
            steps {
                script {
                    sh 'docker-compose build'
                }
            }
        }

        stage('🚀 Run Services') {
            steps {
                script {
                    sh 'docker-compose up -d'
                }
            }
        }

        stage('🧪 Test App') {
            steps {
                echo 'Optional: Add test scripts here'
                // For example: sh 'docker exec backend npm test'
            }
        }

        stage('🧹 Tear Down') {
            steps {
                script {
                    sh 'docker-compose down'
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
