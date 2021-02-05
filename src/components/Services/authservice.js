import {FetchService} from './fetchservice';

export class AuthService {
    static async ForgotPassword(email) {
        return FetchService.fetchNow('Auth/ForgotPassword/'+email,"GET")
    }
    static async ResetPassword(id,token,password) {
        return FetchService.fetchNow('Auth/ResetPassword',"POST",{id: id, token: token, password: password})
    }
}
