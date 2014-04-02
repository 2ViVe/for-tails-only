module API
  module Controller

    def current_user
      return session[:user] if session[:user]
      token = cookies.signed[:remember_token]
      if token.present?
        user_response = API::User.show(token)
        if user_response.success? && ['D','P','E','R'].include?(user_response.body["role-code"])
          session[:user]  = ::User.new(user_response.body)
          session[:token] = token
        else
          cookies.delete(:remember_token)
        end
      end
      session[:user]
    end

    def loggin?
      not current_user.nil?
    end

    def redirect_back_or_default(default = root_path, opt = {})
      redirect_to(request.referer || default, opt)
    end
    
    private
    
      def login_required
        redirect_to signin_path unless loggin?
      end
  end
end