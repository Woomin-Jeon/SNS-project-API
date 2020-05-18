if [ -d /home/ubuntu/build ]; then
    rm -rf /home/ubuntu/build
fi
mkdir -vp /home/ubuntu/build

if [[ "$(docker images -q dal96k/woomin-facebook-codedeploy:latest 2> /dev/null)" != "" ]]; then
docker rmi -f $(docker images --format '{{.Repository}}:{{.Tag}}' --filter=reference='dal96k/woomin-facebook-codedeploy:latest')
fi
