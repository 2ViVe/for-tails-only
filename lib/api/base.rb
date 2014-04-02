module API
  class Base
    class HTTPMethodError < StandardError; end
    class APIServerError < StandardError; end
    class APITokenUnauthorized < StandardError; end

    # BASE_URL = 
    HEADER_WHITE_LIST = %w(Host Content-Length Accept Accept-Language Content-Type X-Authentication-Token User-Agent X-Device-UUID X-Device-Info X-WSSID-Authorization X-Client-Id X-Client-Secret X-Company-Code X-User-Id Accept-Language X-Device-IP)
    DEFAULT_HEADERS = {
      :content_type       => :json,
      :'X-Client-Id'      => ApiConfig::NODE_KEY,
      :'X-Client-Secret'  => ApiConfig::NODE_SECRET,
      "Accept-Language" => "en",
      :"X-Company-Code" => "zoivi"
    }

    class << self
      def send_request(http_method, params)
        RestClient.send(*generate_restclient_arguments(http_method, params)) do |response, request, result|
          puts response if ENV["RAILS_ENV"] == "development"
          case response.code
          when 200
            API::Response.new(response)
          # when 400
          #   raise APIServerError, API::Response.new(response).error_message
          when 401
            raise APITokenUnauthorized
          # when 403
          #   raise APIServerError, API::Response.new(response).error_message
          else
            API::Response.new(response, "Service Error")
          end
        end
      rescue Errno::ETIMEDOUT => e
        API::Response.new(nil, "Service Unavailable")
      end
            
      def base_url
        ApiConfig::NODE_SERVICE
      end
      
      private

        def generate_restclient_arguments(http_method, params)
          params.symbolize_keys!
          path    = params.delete(:path)
          headers = {}

          HEADER_WHITE_LIST.each do |key|
            headers[key.to_sym] = params.delete(key.to_sym) if params[key.to_sym].present?
          end

          case http_method.to_sym
          when :get, :head, :delete, :options
            [http_method.to_sym, "#{base_url}#{path}", DEFAULT_HEADERS.merge(headers).merge(params: params)]
          when :put, :post, :patch
            [http_method.to_sym, "#{base_url}#{path}", params.to_json, DEFAULT_HEADERS.merge(headers)]
          else
            raise HTTPMethodError, "#{http_method.to_s} is invalid, http methods only supports get head delete options put post patch"
          end
        end
    end
  end
end