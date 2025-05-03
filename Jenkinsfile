pipeline {
    agent any

    environment {
        IMAGE_NAME = 'frontend-note-list'
        CONTAINER_NAME = 'frontend-note-list'
    }

    stages {
        stage('Checkout') {
            steps {
                git 'https://github.com/andreirhamni09/frontend-note-list.git'
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
                bat 'docker build -t %IMAGE_NAME% .'
            }
        }

        stage('Docker Run') {
            steps {
                bat 'docker rm -f %CONTAINER_NAME% || exit 0'
                bat 'docker run -d --name %CONTAINER_NAME% -p 3000:3000 %IMAGE_NAME%'
            }
        }
    }

    post {
        always {
            echo 'Pipeline selesai.'
        }
    }
}
