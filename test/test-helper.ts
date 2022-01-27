import {WebDriver} from "../lib/driver/web-driver";

export async function open(url: string){
    await WebDriver.instance().then(b => b.url(url));
}
