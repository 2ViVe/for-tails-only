module API
  class User < Base

    class << self
      def show(token)
        send_request(:get, path: '/v2/profile', :'X-Authentication-Token' => token)
      end

      def reset_password(token, password_attrs)
        options = {
          :path => '/v2/profile/password',
          :'X-Authentication-Token' => token
        }
        response = send_request(:post, options.merge(password_attrs))
        response_messages(response)
      end

      def update_profile(token, attrs)
        options = {
          :path => '/v2/profile',
          :'X-Authentication-Token' => token
        }
        response = send_request(:post, options.merge(attrs))
        response_messages(response)
      end
      
      def profile_validate(token)
        send_request(:get, path: '/v2/profile/validate', :'X-Authentication-Token' => token).body
      end
      
      private

      def response_messages(response)
        success = true
        message = ""
        messages = []
        response = JSON.parse(response.response)
        if response["meta"]["error"].present?
          success = false
          messages = response["meta"]["error"]["data"]["failures"] if response["meta"]["error"]["data"].present?
          message = response["meta"]["error"]["message"]
        end
        {success: success, message: message, messages: messages}
      end
    end
  end
end
