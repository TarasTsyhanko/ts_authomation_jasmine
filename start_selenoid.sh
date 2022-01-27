#!/usr/bin/env bash

docker rm -f selenoid
docker rm -f selenoid-ui

while getopts b:v: flag
do
    # shellcheck disable=SC2220
    case "${flag}" in
        b) browser_name=${OPTARG};;
        v) browser_version=${OPTARG};;
    esac
done

docker pull "selenoid/vnc:${browser_name}_${browser_version}"

docker run -d --name selenoid                       \
    -p 4545:4444                                    \
    -v $(pwd):/etc/selenoid:ro                      \
    -v /var/run/docker.sock:/var/run/docker.sock    \
    aerokube/selenoid:latest-release                \
    -timeout 10m0s                                   \
    -limit 10

DOCKER_GATEWAY_ADDR=`docker inspect selenoid -f {{.NetworkSettings.Gateway}}`

docker run -d           \
    --name selenoid-ui  \
    --link selenoid     \
    -p 8091:8080        \
    aerokube/selenoid-ui --selenoid-uri=http://${DOCKER_GATEWAY_ADDR}:4545

# bash start_selenoid.sh

docker run -d  --name selenoid-ui_origin --link selenoid_origin -p 8080:8080 aerokube/selenoid-ui --selenoid-uri=http://selenoid_origin:4444