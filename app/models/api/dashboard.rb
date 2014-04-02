module API
  class Dashboard < Base
    
    class << self

      def base_url
        ApiConfig::DASHBOARD_SERVICE
      end
      
      def header_status(id)
        send_request(:get, path: "/v1/dashboard/#{id}/header_status").body
      end
      
      def business_task(id)
        send_request(:get, path: "/v1/dashboard/#{id}/business_task").body
      end
      
      def acceler8_tracker(id)
        send_request(:get, path: "/v1/dashboard/#{id}/acceler8_tracker").body
      end
      
      def distributor_status(id)
        send_request(:get, path: "/v1/dashboard/#{id}/distributor_status").body
      end
      
      def team_volumes(id)
        send_request(:get, path: "/v1/dashboard/#{id}/team_volumes").body
      end
      
    end
  end
end