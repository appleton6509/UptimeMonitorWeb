import {FetchService} from './fetchservice';

export class AuthService {
    static async ForgotPassword(email) {
        return FetchService.fetchNow('Auth/ForgotPassword/'+email,"GET")
    }

}
