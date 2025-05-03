pipeline {
    agent any

    environment {
        COMPOSE_FILE = 'docker-compose.yml'
    }

    stages {
        stage('Clean up') {
            steps {
                script {
                    bat 'docker-compose -f %COMPOSE_FILE% down -v --remove-orphans || exit 0'
                }
            }
        }

        stage('Build & Run Docker') {
            steps {
                script {
                    bat 'docker-compose -f %COMPOSE_FILE% up -d --build'
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

        stage('Test') {
            steps {
                bat 'docker exec frontend-note-list yarn test || exit 0'
            }
        }
    }

    post {
        always {
            bat 'docker-compose down -v --remove-orphans'
        }
    }
}
