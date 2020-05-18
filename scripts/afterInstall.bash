docker pull dal96k/woomin-facebook:latest
docker run --env-file <(env | grep -vE '\r|\n' | grep -iE 'MONGODB_URI|DB_DEVELOPMENT|DB_TEST|SENTRY_DSN|AWS_ACCESS_KEY|AWS_SECRET_ACCESS_KEY') \ /home/ubuntu/.env --publish 7070:7070 -it --detach --name woomin-facebook-codedeploy dal96k/woomin-facebook:latest /bin/bash
