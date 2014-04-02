module ControllerMacros
  def login_user
    expect_any_instance_of(User).to receive(:save!).and_return( true )
    user = create(:user)
    request.session[:user] = user
  end

  def current_user
    create(:user)
  end

  def success_before_filter
    # expect(controller).to receive(:profile_validate).and_return( true )

    stub_request(:get, "http://192.168.199.126:9011/v1/dashboard/9999/business_task").
         with(:headers => {'Accept'=>'*/*; q=0.5, application/xml', 'Accept-Encoding'=>'gzip, deflate', 'Accept-Language'=>'en', 'Content-Type'=>'application/json', 'User-Agent'=>'Ruby', 'X-Client-Id'=>'test_client_id_1', 'X-Client-Secret'=>'test_client_secret_1', 'X-Company-Code'=>'zoivi'}).
         to_return(:status => 200, :body => "{}", :headers => {})

    stub_request(:get, "http://demo.abovegem.com:8082/v2/autoships?X-Authentication-Token=").
         with(:headers => {'Accept'=>'*/*; q=0.5, application/xml', 'Accept-Encoding'=>'gzip, deflate', 'Accept-Language'=>'en', 'Content-Type'=>'application/json', 'User-Agent'=>'Ruby', 'X-Client-Id'=>'test_client_id_1', 'X-Client-Secret'=>'test_client_secret_1', 'X-Company-Code'=>'zoivi'}).
         to_return(:status => 200, :body => "{}", :headers => {})

    stub_request(:get, "http://192.168.199.126:9011/v1/dashboard/9999/distributor_status").
         with(:headers => {'Accept'=>'*/*; q=0.5, application/xml', 'Accept-Encoding'=>'gzip, deflate', 'Accept-Language'=>'en', 'Content-Type'=>'application/json', 'User-Agent'=>'Ruby', 'X-Client-Id'=>'test_client_id_1', 'X-Client-Secret'=>'test_client_secret_1', 'X-Company-Code'=>'zoivi'}).
         to_return(:status => 200, :body => "{}", :headers => {})

    stub_request(:get, "http://192.168.199.126:9011/v1/dashboard/9999/acceler8_tracker").
         with(:headers => {'Accept'=>'*/*; q=0.5, application/xml', 'Accept-Encoding'=>'gzip, deflate', 'Accept-Language'=>'en', 'Content-Type'=>'application/json', 'User-Agent'=>'Ruby', 'X-Client-Id'=>'test_client_id_1', 'X-Client-Secret'=>'test_client_secret_1', 'X-Company-Code'=>'zoivi'}).
         to_return(:status => 200, :body => "{}", :headers => {})

    stub_request(:get, "http://192.168.199.126:9011/v1/dashboard/9999/team_volumes").
         with(:headers => {'Accept'=>'*/*; q=0.5, application/xml', 'Accept-Encoding'=>'gzip, deflate', 'Accept-Language'=>'en', 'Content-Type'=>'application/json', 'User-Agent'=>'Ruby', 'X-Client-Id'=>'test_client_id_1', 'X-Client-Secret'=>'test_client_secret_1', 'X-Company-Code'=>'zoivi'}).
         to_return(:status => 200, :body => "{}", :headers => {})

    stub_request(:post, "http://demo.abovegem.com:8082/v2/authentications/token").
         with(:body => "{\"user\":\"test\",\"password\":\"123123\",\"client-id\":\"test_client_id_1\"}",
              :headers => {'Accept'=>'*/*; q=0.5, application/xml', 'Accept-Encoding'=>'gzip, deflate', 'Accept-Language'=>'en', 'Content-Length'=>'66', 'Content-Type'=>'application/json', 'User-Agent'=>'Ruby', 'X-Client-Id'=>'test_client_id_1', 'X-Client-Secret'=>'test_client_secret_1', 'X-Company-Code'=>'zoivi', 'X-Device-Ip'=>'0.0.0.0', 'X-Device-Uuid'=>'mao'}).
         to_return(:status => 200, :body => JSON.generate("response" => {"authentication-token" => "xxx"}), :headers => {})

    profile = JSON.generate("response" => {
      "user-id" => 37702,
      "name" => "mao qiuyun",
      "login" => "1363",
      "email" => "support@zoivi.com",
      "distributor-id" => '136301',
      "registration-date" => "2014-01-01T00:00:00.000Z",
      "next-renewal-date" => "2013-11-11T00:00:00.000Z",
      "birth-date" => "0001-01-01 BC",
      "ssn" => "999136301",
      "company" => '',
      "packtype-id" => '',
      "role-name" => "Distributor",
      "role-code" => "D",
      "image-url" => "http://demo.abovegem.com:11001/images/nopic_mini.jpg"
    })

    stub_request(:get, "http://demo.abovegem.com:8082/v2/profile").
         with(:headers => {'Accept'=>'*/*; q=0.5, application/xml', 'Accept-Encoding'=>'gzip, deflate', 'Accept-Language'=>'en', 'Content-Type'=>'application/json', 'User-Agent'=>'Ruby', 'X-Authentication-Token'=>'xxx', 'X-Client-Id'=>'test_client_id_1', 'X-Client-Secret'=>'test_client_secret_1', 'X-Company-Code'=>'zoivi'}).
         to_return(:status => 200, :body => profile, :headers => {})

    valid = JSON.generate("response" => {
      "home-address-failures" => [],
      "billing-address-failures" => [],
      "shipping-address-failures" => [],
      "website-address-failures" => []
    })

    stub_request(:get, "http://demo.abovegem.com:8082/v2/profile/validate?X-Authentication-Token=").
         with(:headers => {'Accept'=>'*/*; q=0.5, application/xml', 'Accept-Encoding'=>'gzip, deflate', 'Accept-Language'=>'en', 'Content-Type'=>'application/json', 'User-Agent'=>'Ruby', 'X-Client-Id'=>'test_client_id_1', 'X-Client-Secret'=>'test_client_secret_1', 'X-Company-Code'=>'zoivi'}).
         to_return(:status => 200, :body => valid, :headers => {})
  end

end
