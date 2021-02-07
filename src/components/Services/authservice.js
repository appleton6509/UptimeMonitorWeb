import {FetchService} from './fetchservice';

export class AuthService {
    static async ForgotPassword(username) {
        return FetchService.fetchNow('Auth/ForgotPassword/'+username,"GET")
    }
    static async ResetPassword(id,token,password) {
        return FetchService.fetchNow('Auth/ResetPassword',"POST",{id: id, token: token, password: password})
    }
    static async ChangePassword(username, password, newPassword) {
        return FetchService.fetchNow('Auth/ChangePassword',"PUT",{username: username, password: password, newPassword: newPassword})
    }
    static async DeleteAccount(id) {
        return FetchService.fetchNow('Auth/DeleteAccount/'+id,"DELETE")
    }
}
