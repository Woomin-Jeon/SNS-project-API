cp /home/ubuntu/.env /home/ubuntu/build/
cd /home/ubuntu/build
npm install
docker build -t dal96k/woomin-facebook-codedeploy-image:latest .
docker run --publish 7070:7070 -it --detach --name woomin-facebook-codedeploy dal96k/woomin-facebook-codedeploy-image:latest /bin/bash
