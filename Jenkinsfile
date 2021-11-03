pipeline {
        environment {
        registry = "elchananmizrachi/2bcloud"
        registryCredential = 'dockerhub_id'
        dockerImage = ''
        }

    agent {
            any { 
              args '-u root:sudo -v /var/lib/jenkins/workspace/2bcloud-assignment'
            }  
        }    

    stages {
        stage ('Clone') {
            steps {
                git branch: 'master', url: "https://github.com/elchananmizrachi/2bcloud.git/"
            }
        }


        stage ('Change version tag number') {
            steps {
                sh "sed -ir 's/__TAG__/${env.BUILD_ID}/g' 2bcloud.yaml"
            }
        }

        stage ('Build docker image') {
            steps {
                script {
                    dockerImage = docker.build registry + "${env.BUILD_ID}"
                }
            }
        }

        stage ('Push image to Docker Hub') {

            steps {
                    script {
                        docker.withRegistry( '', registryCredential ) {
                        dockerImage.push()
                    }    
                }
            }
        }    

        stage ('K8s deployment') {
            steps {
                script{
                   def image_id = registry + "${env.BUILD_ID}"
                   sh "kubectl apply -f  2bcloud.yaml"
                }
            }
        }       
    }
}




       
