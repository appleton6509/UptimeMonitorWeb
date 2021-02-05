import ipRegex from 'ip-regex';
import urlRegex from 'url-regex-safe'

export default class validator {
    static isValidEmail(email) {
        let user = email.toLowerCase();
        const validUser = new RegExp("[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?.)+[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?");
        if (validUser.test(user))
            return true;
        else {
            return false;
        }
    }
    static isValidUrl(url) {
        let isValidIp = ipRegex().test(url);
        let isValidUrl = urlRegex({localhost: false}).test(url);
         if (isValidIp || isValidUrl)
            return true
        else
            return false;
    }
}