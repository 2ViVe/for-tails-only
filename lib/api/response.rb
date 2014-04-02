module API
  class Response
    attr_accessor :response, :notice

    def initialize(response=nil, msg=nil)
      @response = response
      @notice = msg
    end

    def success?
      [200, 201].include? response.code 
    end

    def request
      response_body['request']
    end

    def meta
      response_body['meta']
    end

    def body
      response_body['response']
    end

    def error_message
      meta && meta["error"] && meta["error"]["message"]
    end

    private

    def response_body
      return @response_body if defined?(@response_body)
      @response_body = JSON.parse(response.body)
    end
  end
end
