pipeline {
    agent any

	environment {
		DOCKERHUB_CREDENTIALS=credentials('dockerhub-cred')
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
                    docker.build("elchananmizrachi/2bcloud:${env.BUILD_ID}")
                }
            }
        }



		stage('Login to Docker Hub') {

			steps {
				sh 'echo $DOCKERHUB_CREDENTIALS_PSW | docker login -u $DOCKERHUB_CREDENTIALS_USR --password-stdin'
			}
		}

		stage('Push image to Docker Hub') {

			steps {
				sh 'docker push elchananmizrachi/2bcloud: + "${env.BUILD_ID}"'
			}
		}

        stage ('K8s deployment') {
            steps {
                kubernetesDeploy(configs: "2bcloud.yaml", kubeconfigId: "mykubeconfig")
            }
        }
    }

    post {
        always {
            sh 'docker logout'
        }
    }
}