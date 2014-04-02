module API
  class Order < Base
    class << self
      
      def checkout params, token
        response = send_request(:post, params.merge(path: '/v2/orders/checkout',:'X-Authentication-Token' => token))
      end
      
      def create params, token
        send_request(:post, params.merge(path: '/v2/orders',:'X-Authentication-Token' => token))
      end
      
      def pay params,id ,token
        response = send_request(:post, params.merge(path: "/v2/orders/#{id}/payments",:'X-Authentication-Token' => token))
        response.body
      end
      
      def find id, token
        response = send_request(:get, path: "/v2/orders/#{id}", :'X-Authentication-Token' => token)
        response.body
      end
      
      def get_adjustments params, token
        response = send_request(:post, params.merge(path: '/v2/orders/adjustments',:'X-Authentication-Token' => token))
        response.body
      end
      
      def list(token, offset = 0, limit = 50)
       attrs = {
          :path => '/v2/orders/recent',
          :'X-Authentication-Token' => token,
          :offset => offset,
          :limit => limit
        }
        response = send_request(:get, attrs )
        response.body
      end
      
    end
  end
end

