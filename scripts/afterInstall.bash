docker pull dal96k/woomin-facebook:latest
docker run --env-file /home/ubuntu/.env --publish 7070:7070 -it --detach --name woomin-facebook-codedeploy dal96k/woomin-facebook:latest /bin/bash
