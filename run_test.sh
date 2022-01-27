#!/usr/bin/env bash

#bash start_selenoid.sh -b chrome -v 87.0

#run tests
docker-compose -f docker/docker-compose.test.yml up --build

#copy allure results from container
docker cp compose_tsc_test:/TS-test/allure-results $PWD

echo 'Open browser in next URL to see Allure Report  http://localhost:5050/allure-docker-service/latest-report'
#run allure report in container
docker-compose -f docker/docker-compose.report.yml up

#open in browser to view report http://localhost:5050/allure-docker-service/latest-report
docker-compose rm