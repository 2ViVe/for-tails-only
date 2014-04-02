module API
  class Concact < Base

    class << self
      def base_url
        ApiConfig::ADMIN_SERVICE
      end
      
      def show login
        send_request(:get, path: "/v1/admin/users/contact", :login => login, "X-Company-Code" => "zoivi", "X-User-Id" => 1)
      end
    end
  end
end