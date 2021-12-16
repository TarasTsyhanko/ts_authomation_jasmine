import fetch from 'node-fetch';
import {Reporter} from "./reporter";
import {ContentType} from "allure2-js-commons";

export default class HttpClient {

    public async get(url: string, headers: any, params = {}) {
        return await HttpClient.executeRequest(url + `?${new URLSearchParams(params)}`, 'GET', headers)
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
        const response = await fetch(url, {method: method, body: body, headers: headers});
        const response_v2 = response.clone();
        await logResponse(response)
        return response_v2
    }

}

async function logRequest(method: string, url: string, body: any, headers: any): Promise<void> {
    const requestData = {
        url: url,
        method: method,
        headers: headers,
        body: parser(body)
    };
    await Reporter.attachFile('Request', `Request : ${JSON.stringify(requestData, null, 2)}`, ContentType.JSON)
}

async function logResponse(response: any): Promise<void> {
    const responseData = {
        transactionTime: `$ seconds`,
        statusCode: response.status,
        headers: await response.headers,
        body: parser(await response.text())
    };
    await Reporter.attachFile('Response', `Response : ${JSON.stringify(responseData, null, 2)}`, ContentType.JSON)
}

const parser = function (json: string) {
    try {
        return JSON.parse(json);
    } catch (e) {
        return json;
    }
};

