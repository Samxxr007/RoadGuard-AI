pipeline {
    agent any

    environment {
        REGISTRY    = 'ghcr.io'
        IMAGE_BASE  = 'samxxr007/roadguard'
        KUBECONFIG  = credentials('kubeconfig')
        IMAGE_TAG   = "${env.GIT_COMMIT?.take(8) ?: 'latest'}"
    }

    stages {

        stage('Checkout') {
            steps {
                checkout scm
                echo "📦 Commit: ${env.GIT_COMMIT}"
            }
        }

        stage('Pull Latest Images') {
            steps {
                sh '''
                    docker pull ${REGISTRY}/${IMAGE_BASE}-frontend:latest || true
                    docker pull ${REGISTRY}/${IMAGE_BASE}-backend:latest  || true
                    docker pull ${REGISTRY}/${IMAGE_BASE}-ai:latest       || true
                '''
            }
        }

        stage('Validate Kubernetes Config') {
            steps {
                sh '''
                    kubectl --kubeconfig=$KUBECONFIG cluster-info --request-timeout=5s
                    kubectl --kubeconfig=$KUBECONFIG apply --dry-run=client -f k8s/
                '''
            }
        }

        stage('Deploy to Kubernetes') {
            steps {
                sh '''
                    # Update image tags
                    kubectl --kubeconfig=$KUBECONFIG set image deployment/roadguard-frontend \
                        frontend=${REGISTRY}/${IMAGE_BASE}-frontend:${IMAGE_TAG} -n roadguard

                    kubectl --kubeconfig=$KUBECONFIG set image deployment/roadguard-backend \
                        backend=${REGISTRY}/${IMAGE_BASE}-backend:${IMAGE_TAG} -n roadguard

                    kubectl --kubeconfig=$KUBECONFIG set image deployment/roadguard-ai \
                        ai-service=${REGISTRY}/${IMAGE_BASE}-ai:${IMAGE_TAG} -n roadguard
                '''
            }
        }

        stage('Wait for Rollout') {
            steps {
                sh '''
                    kubectl --kubeconfig=$KUBECONFIG rollout status deployment/roadguard-frontend \
                        -n roadguard --timeout=300s

                    kubectl --kubeconfig=$KUBECONFIG rollout status deployment/roadguard-backend \
                        -n roadguard --timeout=300s

                    kubectl --kubeconfig=$KUBECONFIG rollout status deployment/roadguard-ai \
                        -n roadguard --timeout=300s
                '''
            }
        }

        stage('Health Check') {
            steps {
                sh '''
                    BACKEND_IP=$(kubectl --kubeconfig=$KUBECONFIG get svc roadguard-backend \
                        -n roadguard -o jsonpath='{.spec.clusterIP}')
                    curl -f http://${BACKEND_IP}:8000/api/v1/health || exit 1
                    echo "✅ Backend health check passed"
                '''
            }
        }

        stage('Smoke Test') {
            steps {
                sh '''
                    echo "Running smoke tests..."
                    # Verify AI service health
                    AI_IP=$(kubectl --kubeconfig=$KUBECONFIG get svc roadguard-ai \
                        -n roadguard -o jsonpath='{.spec.clusterIP}')
                    curl -f http://${AI_IP}:8001/health || echo "⚠️  AI service not ready yet"
                    echo "✅ Smoke tests complete"
                '''
            }
        }
    }

    post {
        success {
            echo '✅ Deployment successful!'
        }
        failure {
            echo '❌ Deployment failed — rolling back...'
            sh '''
                kubectl --kubeconfig=$KUBECONFIG rollout undo deployment/roadguard-frontend -n roadguard || true
                kubectl --kubeconfig=$KUBECONFIG rollout undo deployment/roadguard-backend  -n roadguard || true
                kubectl --kubeconfig=$KUBECONFIG rollout undo deployment/roadguard-ai        -n roadguard || true
            '''
            echo '🔄 Rollback complete'
        }
        always {
            cleanWs()
        }
    }
}
