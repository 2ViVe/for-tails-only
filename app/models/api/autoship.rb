module API
  class Autoship < Base
    FOR = {
      'D' =>%w[P H R],
      'P' =>%w[H R],
      'H' =>%w[H],
      'R' =>%w[R]
    }
    NAME = {
      'P' =>'Member',
      'H' =>'Autoship Customer',
      'R' =>'Retail Customer'
    }

    class << self

      #@param[string]
      #/v1/autoships
      def create(token, opts = {})
        send_request(:post, opts.merge(path: '/v2/autoships',:'X-Authentication-Token' => token))
      end

      def all_records(token)
        send_request(:get, {
          :path                     => '/v2/autoships',
          :'X-Authentication-Token' => token
        }).body
      end

      def summary(token, opts = {})
        send_request(:post, opts.merge(path: '/v2/autoships/orders/summary',:'X-Authentication-Token' => token)).body
      end

      def find(autoship_id, token)
        send_request(:get, {
          :path                     => "/v2/autoships/#{autoship_id.to_i}",
          :'X-Authentication-Token' => token
        }).body
      end

      def products(token, role_code = 'P')
        send_request(:get, {
          :path => "/v2/autoships/products?role-code=#{role_code}",
          :'X-Authentication-Token' => token
        }).body
      end

      def payment_methods(token, country_id)
        send_request(:get, {
          :path                     => '/v2/autoships/payment-methods',
          :'country-id'             => country_id.to_i,
          :'X-Authentication-Token' => token
        }).body
      end

      def shipping_methods(token, country_id, state_id)
        send_request(:get, {
          :path                     => '/v2/autoships/shipping-methods',
          :'country-id'             => country_id.to_i,
          :'state-id'               => state_id.to_i,
          :'X-Authentication-Token' => token
        }).body
      end

      def update(token, autoship_id, opts = {})
        send_request(:post, opts.merge(path: "/v2/autoships/#{autoship_id.to_i}",:'X-Authentication-Token' => token))
      end

      def canceled(token, autoship_id)
        send_request(:delete, {
          :path                     => "/v2/autoships/#{autoship_id.to_i}",
          :'X-Authentication-Token' => token
        })
      end

    end #singleclass
  end #class Autoship
end