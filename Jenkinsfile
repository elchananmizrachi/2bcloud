pipeline {
    agent any

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
                    docker.build("elchananmizrachi/2bcloud:${env.BUILD_ID}")
                }
            }
        }

        stage ('Push image to Docker Hub') {
            steps {
                rtDockerPush(
                    image: 'elchananmizrachi/2bcloud:' + "${env.BUILD_ID}",
                    properties: 'project-name=2bcloud;status=stable'
                )
            }
        }


        stage ('K8s deployment') {
            steps {
                kubernetesDeploy(configs: "2bcloud.yaml", kubeconfigId: "mykubeconfig")
            }
        }
    }
}