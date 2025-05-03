pipeline {
    agent any

    environment {
        COMPOSE_FILE = 'docker-compose.yml'
    }

    stages {
        stage('Clean up') {
            steps {
                script {
                    if (isUnix()) {
                        sh 'docker-compose -f $COMPOSE_FILE down || true'
                    } else {
                        bat 'docker-compose -f %COMPOSE_FILE% down || exit 0'
                    }
                }
            }
        }

        stage('Build & Run Docker') {
            steps {
                script {
                    if (isUnix()) {
                        sh 'docker-compose -f $COMPOSE_FILE up -d --build'
                    } else {
                        bat 'docker-compose -f %COMPOSE_FILE% up -d --build'
                    }
                }
            }
        }

        stage('Test') {
            steps {
                script {
                    if (isUnix()) {
                        sh 'docker exec frontend-note-list yarn test || true'
                    } else {
                        bat 'docker exec frontend-note-list yarn test || exit 0'
                    }
                }
            }
        }
    }

    post {
        always {
            script {
                if (isUnix()) {
                    sh 'docker-compose down'
                } else {
                    bat 'docker-compose down'
                }
            }
        }
    }
}
