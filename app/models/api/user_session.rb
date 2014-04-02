module API
  class UserSession < Base

    class << self
      def create(params)
        client_ip = params.delete(:client_ip)
        send_request(:post, params.merge(path: '/v2/authentications/token',
                                         :'client-id'     => ApiConfig::NODE_KEY,
                                         :'X-Device-UUID' => "mao#{Rails.env == 'test' ? "" : rand(999999)}",
                                         :'X-Device-IP'   => client_ip
                                        )
        )
      end

      def reset_password_token(opts = {})
        send_request(:post, {
          :path  => '/v2/authentications/reset-password-tokens',
          :email => opts[:email]
        }).body
      end
      
      def get_token_by_admin(admin_token, user_id, client_ip)
        send_request(:post, path: "/v2/admin/users/#{user_id}/token",
                             :'client-id'     => ApiConfig::NODE_KEY,
                             :'X-Authentication-Token' => admin_token,
                             :'X-Device-IP'   => client_ip
        )
        
      end
      
    end
  end
end
