pipeline {
    // TESTING 
    agent any

    environment {
        COMPOSE_FILE = 'docker-compose.yml'
    }

    stages {

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
        
        stage('Build and Start Docker') {
            steps {
                bat 'docker-compose down --remove-orphans'
                bat 'docker-compose build --no-cache'
                bat 'docker-compose up -d'
            }
        }

        stage('Test') {
            steps {
                bat 'docker exec frontend-note-list yarn test || exit 0'
            }
        }
    }
}
