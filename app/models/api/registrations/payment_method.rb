module API
  module Registrations
    class PaymentMethod < Base
    
      class << self
            
        def index(params)
          options = {
            :path         => '/v2/registrations/orders/payment-methods',
            :'country-id' => params['country-id']
          }
          send_request(:get, options)
        end
      end
    end
  end
end