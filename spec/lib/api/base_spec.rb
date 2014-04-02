require "spec_helper"

describe API::Base do
  describe "send request" do
    it "should get 200 when response success" do
      stub_request(:get, "http://demo.abovegem.com:8082/test/url").
         with(:headers => {'Accept'=>'*/*; q=0.5, application/xml', 'Accept-Encoding'=>'gzip, deflate', 'Accept-Language'=>'en', 'Content-Type'=>'application/json', 'User-Agent'=>'Ruby', 'X-Client-Id'=>'test_client_id_1', 'X-Client-Secret'=>'test_client_secret_1', 'X-Company-Code'=>'zoivi'}).
         to_return(:status => 200, :body => "{}", :headers => {})

      params = {
        path: '/test/url'
      }
      resp = API::Base.send_request(:get, params)
      expect(resp.success?).to eq(true)
    end
    
    it "should get 'Service Error' when response code not 200" do
      body = JSON.generate("meta" => {
        'code' => 999888
      })

      stub_request(:get, "http://demo.abovegem.com:8082/test/url").
         with(:headers => {'Accept'=>'*/*; q=0.5, application/xml', 'Accept-Encoding'=>'gzip, deflate', 'Accept-Language'=>'en', 'Content-Type'=>'application/json', 'User-Agent'=>'Ruby', 'X-Client-Id'=>'test_client_id_1', 'X-Client-Secret'=>'test_client_secret_1', 'X-Company-Code'=>'zoivi'}).
         to_return(:status => 302, :body => body, :headers => {})

      params = {
        path: '/test/url'
      }
      
      resp = API::Base.send_request(:get, params)
      expect(resp.notice).to eq('Service Error')
    end

    it "should get 'Service Unavailable' when timeout" do
      body = JSON.generate("meta" => {
        'code' => 999888
      })

      stub_request(:get, "http://demo.abovegem.com:8082/test/url").
         with(:headers => {'Accept'=>'*/*; q=0.5, application/xml', 'Accept-Encoding'=>'gzip, deflate', 'Accept-Language'=>'en', 'Content-Type'=>'application/json', 'User-Agent'=>'Ruby', 'X-Client-Id'=>'test_client_id_1', 'X-Client-Secret'=>'test_client_secret_1', 'X-Company-Code'=>'zoivi'}).
         to_raise( Errno::ETIMEDOUT )

      params = {
        path: '/test/url'
      }
      
      resp = API::Base.send_request(:get, params)
      expect(resp.notice).to eq('Service Unavailable')
    end

    it "should get 401 when api token overtime" do
      body = JSON.generate("meta" => {
        'code' => 999888
      })

      stub_request(:get, "http://demo.abovegem.com:8082/test/url").
         with(:headers => {'Accept'=>'*/*; q=0.5, application/xml', 'Accept-Encoding'=>'gzip, deflate', 'Accept-Language'=>'en', 'Content-Type'=>'application/json', 'User-Agent'=>'Ruby', 'X-Client-Id'=>'test_client_id_1', 'X-Client-Secret'=>'test_client_secret_1', 'X-Company-Code'=>'zoivi'}).
         to_return(:status => 401, :body => body, :headers => {})

      params = {
        path: '/test/url'
      }
      
      expect{
        API::Base.send_request(:get, params)
      }.to raise_error(API::Base::APITokenUnauthorized)
      
    end
  end
end