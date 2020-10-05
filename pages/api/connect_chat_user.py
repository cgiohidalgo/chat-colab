from inginious.frontend.plugins.utils.admin_api import AdminApi

class ConnectChatUser(AdminApi):
    def API_GET(self):
        username = self.user_manager.session_username()
        userrealname = self.user_manager.session_realname()
        useremail = self.user_manager.session_email()
        valsuperadmin = self.user_manager.user_is_superadmin(username)
        return 200, {'userEmailUncode': useremail,'usernameUncode':username, 'userRealnameUncode': userrealname,'userAdmin': valsuperadmin}
