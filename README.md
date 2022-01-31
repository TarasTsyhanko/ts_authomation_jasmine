# Automation Test Framework on TypeScript

## Running Tests Locally
### Using Docker(from the root directory):
```
> bash run_test.sh
```
1) start Selenoid using start_selenoid.sh configuration
`bash start_selenoid.sh -b chrome -v 87.0`
2) build container and run test 
`docker-compose -f docker/docker-compose.test.yml up --build`
3) copy allure-result directory from container to project root
`docker cp compose_tsc_test:/TS-test/allure-results $PWD`
4) start Allure container at http://localhost:5050/allure-docker-service/latest-report
`docker-compose -f docker/docker-compose.report.yml up`

### Using local env (from the root directory):
```
> npm install
> npm test
> ! for running UI test, you need to spine up selenoid at http://localhost:4444/wd/hub/
```
## Technology stack

* [Node.js](https://nodejs.org/en/) - last stable version
* [Typescript](https://www.typescriptlang.org/download)

* [Mocha](https://mochajs.org/)
* [webdriverIO](https://webdriver.io/docs/typescript/)
* [node-fetch](https://www.npmjs.com/package/node-fetch)
* [http-request-mock](https://www.npmjs.com/package/http-request-mock)
* [mocha-allure2-reporter](https://github.com/sskorol/mocha-allure2-reporter)