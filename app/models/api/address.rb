module API
  class Address < Base

    class << self
      def list_distributor_address(token, types = %w(billing home shipping website))
        options = {
          :path => '/v2/addresses',
          :types => types.join(','),
          :'X-Authentication-Token' => token
        }
        response = send_request(:get, options)
        response.body
      end

      def update_distributor_home_address(token, address_params)
        options = {
          :path => '/v2/addresses/home',
          :'X-Authentication-Token' => token
        }
        response = send_request(:post, options.merge(address_params))
        update_address_response_message(response)
      end

      def update_distributor_web_address(token, address_params)
        options = {
          :path => '/v2/addresses/website',
          :'X-Authentication-Token' => token
        }
        response = send_request(:post, options.merge(address_params))
        update_address_response_message(response)
      end

      def update_distributor_shipping_address(token, address_params)
        options = {
          :path => '/v2/addresses/shipping',
          :'X-Authentication-Token' => token
        }
        response = send_request(:post, options.merge(address_params))
        update_address_response_message(response)
      end
      
     def update_distributor_billing_address(token, address_params)
        options = {
          :path => '/v2/addresses/billing',
          :'X-Authentication-Token' => token
        }
        response = send_request(:post, options.merge(address_params))
        update_address_response_message(response)
      end 
              
      def validate_billing_address(attrs)
        response = send_request(:post, attrs.merge(path: '/v2/addresses/billing/validate'))
        response_message(response)
      end

      def validate_shipping_address(attrs)
        response = send_request(:post, attrs.merge(path: '/v2/addresses/shipping/validate'))
        response_message(response)
      end

      def change_billing_address(attrs, order_id, token)
        params = {
          :path => "/v2/orders/#{order_id}/addresses/billing",
          :'X-Authentication-Token' => token
        }
        response = send_request(:post, attrs.merge(params) )
        response.body
      end

      def change_shipping_address(attrs, order_id, token)
        params = {
          :path => "/v2/orders/#{order_id}/shipping",
          :'X-Authentication-Token' => token
        }
        response = send_request(:post, attrs.merge(params) )
        response.body
      end

      def response_message response
        success = true
        message = ""
        if response.body["failures"].length > 0
          success = false
          message = response.body["failures"][0]["message"]
        end
        {success: success, message: message}
      end

      #@param[string]
      #/v2/addresses?types=billing,home,shipping,website
      def get_address(token, type = 'billing,home,shipping,website')
        send_request(:get, path: "/v2/addresses?types=#{type}", :'X-Authentication-Token' => token).body
      end

      #
      def validate_ship_address(token, opts = {})
        send_request(:post, opts.update(path: '/v2/addresses/shipping/validate', :'X-Authentication-Token' => token)).body
      end

      def validate_bill_address(token, opts = {})
        send_request(:post, opts.update(path: '/v2/addresses/billing/validate', :'X-Authentication-Token' => token)).body
      end

      private

      def update_address_response_message(response)
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
