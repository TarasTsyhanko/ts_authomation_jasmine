import HttpClient from "../../lib/http-client";
import {Reporter} from "../../lib/reporter";
import HttpRequestMock from 'http-request-mock';
import {Method} from "http-request-mock/dist/types";
import * as chai from 'chai';

export const expect = chai.expect;

const mocker = HttpRequestMock.setup();


describe("API mocked test", () => {
    beforeEach(() => {
        mocker.mock({
            url: 'http://localhost:4444/wd/hub',
            method: Method.GET,
            delay: 0,
            status: 200,
            header: { // respone headers
                'content-type': 'application/json+new',
                'some-header': 'value',
            },
            body: '{ "name":"Test" }'
        });
    })

    it('make request to mocked endpoint', async () => {
        const app = new HttpClient();
        await Reporter.step("simple step", async () => {
            await app.get(
                'http://localhost:4444/wd/hub',
                {'Accept': 'application/json'},
            ).then(async response => {
                expect(response.status).to.eql(200);
                expect(response.headers.get('content-type')).to.eql('application/json+new');
                expect(JSON.parse(await response.text())).to.eql({name: "Test"});
            })
        })
    });

})