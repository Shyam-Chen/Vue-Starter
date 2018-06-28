#!/bin/sh

set -e

$ docker build -f tools/Dockerfile.<dev|prod> -t <IMAGE_NAME>:<IMAGE_TAG> .

$ docker tag <IMAGE_NAME>:<IMAGE_TAG> <DOCKER_ID_USER>/<IMAGE_NAME>:<IMAGE_TAG>
$ docker push <DOCKER_ID_USER>/<IMAGE_NAME>:<IMAGE_TAG>
