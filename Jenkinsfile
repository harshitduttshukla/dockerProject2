// pipeline {
//     agent any

//     environment {
//         PROJECT_NAME = 'brainly-app'
//     }

//     stages {
//         stage(' Clone Repository') {
//             steps {
//                  git branch: 'main', url: 'https://github.com/harshitduttshukla/dockerProject2.git'
//             }
//         }

//         stage(' Build Docker Images') {
//             steps {
//                 script {
//                     bat 'docker-compose build'
//                 }
//             }
//         }

//         stage(' Run Services') {
//             steps {
//                 script {
//                     bat 'docker-compose up -d '
//                 }
//             }
//         }

//         stage('Test App') {
//             steps {
//                 echo 'Optional: Add test scripts here'
//                 // For example: sh 'docker exec backend npm test'
//             }
//         }

//         stage(' Tear Down') {
//             steps {
//                 script {
//                     bat 'docker-compose down'
//                 }
//             }
//         }
//     }

//     post {
//         always {
//             echo '✅ Pipeline finished.'
//         }
//     }
// }


pipeline {
    agent any

    environment {
        PROJECT_NAME = 'brainly-app'
    }

    stages {
        stage('Clone Repository') {
            steps {
                git branch: 'main', url: 'https://github.com/harshitduttshukla/dockerProject2.git'
            }
        }

        stage('Build Docker Images') {
            steps {
                script {
                    bat 'docker-compose build'
                }
            }
        }

        stage('Run Services') {
            steps {
                script {
                    bat 'docker-compose up -d'
                }
            }
        }

        stage('Manual Check') {
            steps {
                input message: """
                🚀 Application is now running!

                👉 Frontend: http://localhost:5173
                👉 Backend API (if any): http://localhost:3000

                ✅ Open in your browser to verify.
                Click 'Proceed' when you're done testing.
                """
            }
        }

        stage('Tear Down') {
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
