pipeline {
    agent any
    tools{
        git "git"
    }
    environment { 
        SLACK_CHANNEL = '#프론트배포'
        MESSAGE = "${env.JOB_NAME} [${env.BUILD_NUMBER}] \n URL: ${env.BUILD_URL} \n BRANCH : $REF \n PUSHER : $PUSHER_NAME ($PUSHER_EMAIL) "
        SUCCESS_MESSAGE = "SUCCESSFUL: ${MESSAGE}"
        ERROR_MESSAGE = "FAILED: ${MESSAGE}"
        START_MESSAGE = "STARTED: ${MESSAGE}"
    }
    // stages 하위에는 stage가 있고
    // stage는 stpes로 나뉘어 작업을 한다.
    stages {
        stage("prepare"){
            steps{
                echo 'prepare'
                git branch: "${BRANCH}", credentialsId: "GIT_ACCOUNT", url: 'https://github.com/Book-Pie/FE.git'
                sh  'ls -al'
            }
        }
        // CD 시작
        stage('start') {
            steps {
                echo '=====================start====================='
                slackSend (channel: "${SLACK_CHANNEL}", color: '#FFFF00', message: "${START_MESSAGE}")
            }
        }
        // 리액트 빌드 시작
        stage('build') {
            steps {
                script {
                    try{
                        echo '=====================build====================='
                        sh 'ls -al'
                        sh "git checkout "
                        sh "sudo yarn install"
                        sh "sudo yarn build"
                    }catch(Exception e){
                        slackSend (channel: "${SLACK_CHANNEL}", color: '#FF0000', message: "${ERROR_MESSAGE}")
                    }
                }
            }
        }
        // 리액트 도커에 deploy 
        stage('deploy') {
            steps {
                script {
                    try{
                         echo '=====================deploy====================='
                         sh "ls -al"
                         sh "docker rm -f `docker ps -a -q`"
                         sh "docker rmi `docker images -q`"
                         sh "docker-compose up -d"
                    }catch(Exception e){
                        slackSend (channel: "${SLACK_CHANNEL}", color: '#FF0000', message: "${ERROR_MESSAGE}")
                    }
                }
            }
        }
    }
    post {
        success {
            slackSend (channel: "${SLACK_CHANNEL}", color: '#00FF00', message: "${SUCCESS_MESSAGE}")       
        }
        failure {
            slackSend (channel: "${SLACK_CHANNEL}", color: '#FF0000', message: "${ERROR_MESSAGE}")       
        }
    }
}
