import fetch from 'node-fetch';
import {Reporter} from "./reporter";
import {ContentType} from "allure2-js-commons";

const {performance} = require('perf_hooks');

export default class HttpClient {

    public async get(url: string, headers: any, params?: any) {
        let query = ''
        if (params) query = `?${new URLSearchParams(params)}`

        return await HttpClient.executeRequest(url + query, 'GET', headers)
    }

    public async post(url: string, body: any, headers?: any) {
        return await HttpClient.executeRequest(url, 'POST', headers, body)
    }

    public async patch(url: string, body?: any, headers?: any) {
        return await HttpClient.executeRequest(url, 'PATCH', headers, body)
    }

    public async delete(url: string, headers?: any) {
        return await HttpClient.executeRequest(url, 'DELETE', headers)
    }

    private static async executeRequest(url: string, method: string, headers: any, body?: any) {
        await logRequest(method, url, body, headers);
        let startTime = performance.now()
        const response = await fetch(url, {method: method, body: body, headers: headers});
        let endTime = performance.now()
        await logResponse(response.clone(), endTime - startTime)
        return response
    }

}

async function logRequest(method: string, url: string, body: any, headers: any): Promise<void> {
    const requestData = {
        url: url,
        method: method,
        headers: headers,
        body: parser(body)
    };
    await Reporter.attachFile('Request', `Request : ${JSON.stringify(requestData, null, 2)}`, ContentType.TEXT)
}

async function logResponse(response: any, millis: number): Promise<void> {
    const responseData = {
        executionTime: millisToSeconds(millis) + " seconds",
        statusCode: response.status,
        headers: await response.headers.raw(),
        body: parser(await response.text())
    };
    await Reporter.attachFile('Response', `Response : ${JSON.stringify(responseData, null, 2)}`, ContentType.TEXT)
}

const millisToSeconds = function (millis: number) {
    return ((millis % 60000) / 1000).toFixed(3)
}

const parser = function (json: string) {
    try {
        return JSON.parse(json);
    } catch (e) {
        return json;
    }
};

