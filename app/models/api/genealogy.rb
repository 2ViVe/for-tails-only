module API
  class Genealogy < Base

    class << self
      def dualteam_data(token, distributor_id=nil)
        url = '/v2/genealogy/dualteam'
        url += "?distributor-id=#{distributor_id}" if (not distributor_id.nil?)
        send_request(:get, path: url, :'X-Authentication-Token' => token).body
      end
      
      def dualteam_path(token, child_distributor_id)
        url = '/v2/genealogy/dualteam/path?from=' + child_distributor_id
        send_request(:get, path: url, :'X-Authentication-Token' => token).body         
      end
      
      def dualteam_extreme_bottom(token, distributor_id, side)
        url = "/v2/genealogy/dualteam/extreme-bottom?distributor-id=#{distributor_id}&side=#{side}" 
        send_request(:get, path: url, :'X-Authentication-Token' => token).body         
      end

    end
  end
end