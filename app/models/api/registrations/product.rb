module API
  module Registrations
    class Product < Base
      class << self
        def list country_id
          send_request(:get, path: '/v2/registrations/products', "country-id" => country_id)
        end
      end
    end
    
    
    
  end
end