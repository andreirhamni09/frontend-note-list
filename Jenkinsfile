pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                git 'https://github.com/andreirhamni09/frontend-note-list.git'
            }
        }
        stage('Install Yarn') {
            steps {
                bat 'npm install -g yarn'
            }
        }

        stage('Install dependencies') {
            steps {
                bat 'yarn install' // gunakan `sh` jika Jenkins Linux
            }
        }

        stage('Build') {
            steps {
                bat 'yarn build'
            }
        }

        stage('Docker Build') {
            steps {
                bat 'docker build -t frontend-note-list .'
            }
        }

        stage('Docker Run') {
            steps {
                bat 'docker run -d --name frontend-note-list -p 3000:3000 frontend-app:latest'
            }
        }
    }

    post {
        always {
            echo 'Pipeline selesai.'
        }
    }
}
