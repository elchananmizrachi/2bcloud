pipeline {
        environment {
        registry = "elchananmizrachi/myapp"
        registryCredential = 'dockerhub_id'
        dockerImage = ''
        }

    agent {
            any { 
              args '-u root:sudo -v /var/lib/jenkins/workspace/myapp'
            }  
        }    

    stages {
        stage ('Clone') {
            steps {
                git branch: 'master', url: "https://github.com/elchananmizrachi/basic-ci-pipeline.git/"
            }
        }


        stage ('Change version tag number') {
            steps {
                sh "sed -ir 's/__TAG__/${env.BUILD_ID}/g' my-app-deployment.yaml"
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
                    
                 sh 'kubectl apply -f my-app-service.yaml'
                 sh 'kubectl apply -f my-app-deployment.yaml'
           }
        }
    }        
}    
