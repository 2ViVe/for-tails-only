module API
  class Sponsor < Base

    class << self
      def verify id
        r = send_request(:get, path: "/v2/registrations/sponsors/#{id}")
      end
    end
  end
end
