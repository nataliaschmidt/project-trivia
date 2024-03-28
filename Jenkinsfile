pipeline {
    agent any

    stages {
        stage('Baixar fonte') {
            steps { 
                    sh 'ssh ubuntu@172.17.0.1 "rm -rf /home/ubuntu/apps/Trivia"'
                    sh 'ssh ubuntu@172.17.0.1 "mkdir -p /home/ubuntu/apps/Trivia"'
                    sh 'scp -r /var/jenkins_home/workspace/Trivia/. ubuntu@172.17.0.1:/home/ubuntu/apps/Trivia'
            } 
        }
        stage('Instalar') {
            steps {
                        sh 'ssh ubuntu@172.17.0.1 "cd /home/ubuntu/apps/Trivia;npm install"'
            }
        }
        stage('Construir') {
            steps {
                        sh 'ssh ubuntu@172.17.0.1 "cd /home/ubuntu/apps/Trivia;npm run build"'
            }
        }
        stage('Iniciar') { 
            steps {
                    sh 'ssh ubuntu@172.17.0.1 cd /home/ubuntu/apps/Trivia;pm2 list >/tmp/lista-pm2;export JENKINS_NODE_COOKIE=dontKillMe;if grep -q "Trivia" /tmp/lista-pm2; then pm2 stop Trivia -s;pm2 delete Trivia -s;fi'
                    sh 'ssh ubuntu@172.17.0.1 "cd /home/ubuntu/apps/Trivia;pm2 start -n Trivia npm -- start;pm2 save --force"' 
            }
        }
    }
}
