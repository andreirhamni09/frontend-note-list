pipeline {
    // TESTING 
    agent any

    environment {
        COMPOSE_FILE = 'docker-compose.yml'
    }

    stages {
        
        stage('Checkout') {
            steps {
                git url: 'https://github.com/andreirhamni09/frontend-note-list.git', branch: 'master'
            }
        }
        stage('Build & Run Docker') {
            steps {
                script {
                    bat 'docker-compose down -v --remove-orphans && docker-compose up -d --build'
                }
            }
        }
    }
}
