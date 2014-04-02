module API
  class Admin < Base
    
    class << self

      def base_url
        ApiConfig::ADMIN_SERVICE
      end
      
      def order_invoices(ids, user_id)
        attrs = {
          :path => "/v1/admin/pdf_invoices?ids=#{ids * ","}",
          :"X-User-Id" => user_id
        }
        send_request(:get, attrs).body
      end
      
    end
  end
end