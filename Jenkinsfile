pipeline {
    // TESTING 
    agent any

    environment {
        COMPOSE_FILE = 'docker-compose.yml'
    }

    stages {

        stage('Build & Run Docker') {
            steps {
                script {
                    bat 'docker-compose down -v --remove-orphans && docker-compose up -d --build'
                }
            }
        }

        stage('Health Check') {
            steps {
                bat '''
                echo Menunggu frontend siap...
                for /l %%x in (1,1,30) do (
                    curl -s http://localhost:3000 >nul && goto ready
                    echo Masih menunggu...
                    timeout /t 2 >nul
                )
                :ready
                echo Frontend siap!
                '''
            }
        }
    }
}
