module API
  module Registrations
    class Adjustment < Base
      class << self
        def index(params)
          send_request :post, params.merge(path: '/v2/registrations/orders/adjustments')
        end
      end
    end
  end
end