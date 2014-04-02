module API
  module Registrations
    class ShippingMethod < Base
    
      class << self
            
        def index(params)
          options = {
            :path         => '/v2/registrations/orders/shipping-methods',
            :'country-id' => params['country-id']
          }
          send_request(:get, options)
        end
      end
    end
  end
end