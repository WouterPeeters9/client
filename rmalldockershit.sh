#!/bin/bash
docker stop $(docker ps -aq)
# Delete all containers
docker rm -f $(docker ps -a -q)
# Delete all images
docker rmi -f $(docker images -q)
