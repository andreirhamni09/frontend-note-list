pipeline {
  agent any

  environment {
    COMPOSE_FILE = 'docker-compose.yml'
  }

  stages {
    stage('Checkout') {
      steps {
        git 'https://github.com/andreirhamni09/aplikasi-note-list.git'
      }
    }

    stage('Build Frontend') {
      steps {
        dir('frontend') {
          bat 'docker build -t frontend-app .'
        }
      }
    }

    stage('Run Docker Compose') {
      steps {
        bat 'docker-compose -f $COMPOSE_FILE up -d --build'
      }
    }
  }

  post {
    always {
      bat 'docker-compose -f $COMPOSE_FILE down'
    }
  }
}
