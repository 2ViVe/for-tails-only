module API
  class Product < Base
    
    class << self
            
      def index(params)
        options = {
          :path         => '/v2/registrations/products',
          :'country-id' => params['country-id'],
          :'role-code'         => params['role-code']
        }
        send_request(:get, options)
      end
      
      def list(token, role_code, catalog_code = 'SP')
        
        params = {
          :path => '/v2/products',
          :'catalog-code' => catalog_code, 
          :'role-code' => role_code, 
          :'X-Authentication-Token' => token
        }
        response = send_request(:get, params )
        response.body
      end
      
      def product_by_taxon(id, token, role_code, catalog_code = 'SP')
        
        params = {
          :path => "/v2/products/taxons/#{id}",
          :'catalog-code' => catalog_code,
          :'role-code' => role_code, 
          :'X-Authentication-Token' => token
        }
        response = send_request(:get, params )
        response.body
      end
      
      def catalog token
        catalog = []
        list(token).each do |products|
          catalog << products["catalog"]
        end
        catalog
      end
      
      def find(id, token, role_code, catalog_code = 'SP')
        params = {
          :path => "/v2/products/#{id}",
          :'catalog-code' => catalog_code,
          :'role-code' => role_code, 
          :'X-Authentication-Token' => token
        }
        response = send_request(:get, params)
        response.body
      end
      
      def taxons token
        response = send_request(:get, path: "/v2/taxons", :'X-Authentication-Token' => token)
        response.body
      end
      
      # def variant_price id, token, price_type = 'DT'
      #   response = send_request(:get, path: "/v2/variants/#{id}/prices", :'order-price-type-code' => price_type, :'X-Authentication-Token' => token)
      #   response.body
      # end
      
      def variant_detail(id, token, role_code, catalog_code = 'SP')
        params = {
          :path => "/v2/variants/#{id}",
          :'catalog-code' => catalog_code,
          :'role-code' => role_code, 
          :'X-Authentication-Token' => token
        }
        response = send_request(:get, params)
        response.body
      end
      
    end
  end
end

