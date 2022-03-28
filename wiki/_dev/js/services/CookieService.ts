import { injectable } from "inversify";

@injectable()
export class CookieService {
    
    setCookie(name: string, value: string, days: number): void {
        let expires = '';
        if (days) {
            let date = new Date();
            date.setTime(date.getTime() + (days*24*60*60*1000));
            expires = `; expires=${date.toUTCString()}`;
        }
        document.cookie = `${name} = ${(value || '')} ${expires} "; path=/`;
    }

    getCookie(name: string): string | null {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) {
            return parts.pop().split(';').shift();
        } 
    }

    deleteCookie(name: string) {
        console.log(this.getCookie(name));
        if(this.getCookie(name)) {
            document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/;`; 
        } 
    }
}


