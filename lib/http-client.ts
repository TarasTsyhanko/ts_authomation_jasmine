import fetch from 'node-fetch';

export default class HttpClient {

    public async get(url: string, config?: any, headers?: any, params = {},) {
        const query = new URLSearchParams(params)
        return HttpClient.executeRequest(url + query, 'GET', headers)
    }

    public async post(url: string, body?: any, headers?: any) {
        return HttpClient.executeRequest(url, 'POST', headers, body)
    }

    public async patch(url: string, body?: any, headers?: any) {
        return HttpClient.executeRequest(url, 'PATCH', headers, body)
    }

    public async delete(url: string, headers?: any) {
        return HttpClient.executeRequest(url, 'DELETE', headers)
    }

    private static async executeRequest(url: string, method: string, headers?: any, body?: any) {
        logRequest(method, url, body, headers)
        const response = await fetch(url, {method: method, body: body, headers: headers});
        await logResponse(response)
        return response
    }
}

function logRequest(method: string, url: string, body: any, headers: any): void {
    const logRequest = {
        url: url,
        method: method,
        headers: headers,
        body: parser(body)
    };
    console.log(logRequest)
}

async function logResponse(response: any): Promise<void> {
    const logResponse = {
        transactionTime: `$ seconds`,
        statusCode: response.status,
        headers: await response.headers,
        body: parser(await response.text())
    };
    console.log(logResponse)
}

const parser = function (json: string) {
    try {
        return JSON.parse(json);
    } catch (e) {
        return json;
    }
};

