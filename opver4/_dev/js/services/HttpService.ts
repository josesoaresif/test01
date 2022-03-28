import { injectable } from "inversify";


declare let $: any;

@injectable()
export class HttpService {
    private url: string;

    get(): JQueryPromise<Object> {
        return $.ajax({
            url: this.url,
            type: 'GET',
            dataType: 'json',
        });
    }

    post(data: Object): JQueryPromise<Object> {
        return $.ajax({
            url: this.url,
            type: 'POST',
            cache : false,
            data: data,
            dataType: 'json',
        });
    }

    setUrl(url: string): void {
        this.url = url;
    }
}


