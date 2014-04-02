module API
  class Country < Base

    class << self
      def list
        send_request(:get, path: '/v2/registrations/countries')
      end

      def shipping_countries_and_states(token)
        send_request(:get, path: '/v2/countries/shipping', :'X-Authentication-Token' => token).body
      end

    end
  end
end