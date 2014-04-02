require "spec_helper"

describe API::Registration do

  describe 'Create' do
    it "should response success" do
      account = 'kaka66'
      params = {
        "special-instructions"=>"", 
        "language"=>"English", 
        "payment-method-id"=>"3003", 
        "shipping-method-id"=>"4", 
        "user-info"=>{
            "sponsor"=>"101", 
            "role-code"=>"D", 
            "login"=>account, 
            "password"=>account, 
            "email"=>"#{account}@123.com", 
            "birthday"=>"1975-4-7", 
            "social-security-number"=>"111222444", 
            "tax-id"=>"111222444", 
            "country-iso"=>"US"}, 
        "shipping-address"=>{
          "first-name"=>"kaka", 
          "m"=>"", 
          "last-name"=>"kaka", 
          "street"=>"kaka", 
          "street-cont"=>"", 
          "city"=>"Sunnyvale", 
          "zip"=>"94085", 
          "state-id"=>"10018", 
          "country-id"=>"1214", 
          "phone"=>"11"}, 
        "home-address"=>{
          "first-name"=>"kaka", 
          "m"=>"", 
          "last-name"=>"kaka", 
          "street"=>"kaka", 
          "street-cont"=>"", 
          "city"=>"Sunnyvale", 
          "zip"=>"94085", 
          "state-id"=>"10018", 
          "country-id"=>"1214", 
          "work-phone"=>"11"}, 
        "line-items"=>[
          {"variant-id"=>"4", "quantity"=>"1", "price"=>"341.00", "image"=>"http://demo.abovegem.com:11001/images/noimage/product.jpg", "pv"=>"300", "name"=>"Basic 10GO Set"}, 
          {"variant-id"=>"14", "quantity"=>"1", "pv"=>"0", "price"=>"49.00", "image"=>"http://demo.abovegem.com:11001/images/noimage/product.jpg", "name"=>"Membership"}], 
        "creditcard"=>{
          "number"=>"4111111111111111", 
          "expiration-year"=>"2016", 
          "expiration-month"=>"3", 
          "cvv"=>"111"}, 
        "billing-address"=>{
          "first-name"=>"kaka", 
          "last-name"=>"kaka", 
          "street"=>"kaka", 
          "street-cont"=>"", 
          "city"=>"Sunnyvale", 
          "zip"=>"94085", 
          "state-id"=>"10018", 
          "country-id"=>"1214", 
          "phone"=>"11"}
        }
      VCR.use_cassette('registration_create') do
        resp = API::Registration.create(params, nil)
        expect(resp).to be_success
      end
    end

    it "should response fail with invalid password" do
      account = 'kaka102'
      params = {
        "special-instructions"=>"", 
        "language"=>"English", 
        "payment-method-id"=>"3003", 
        "shipping-method-id"=>"4", 
        "user-info"=>{
            "sponsor"=>"101", 
            "role-code"=>"D", 
            "login"=>account, 
            "password"=>'a', 
            "email"=>"#{account}@123.com", 
            "birthday"=>"1975-4-7", 
            "social-security-number"=>"111222444", 
            "tax-id"=>"111222444", 
            "country-iso"=>"US"}, 
        "shipping-address"=>{
          "first-name"=>"kaka", 
          "m"=>"", 
          "last-name"=>"kaka", 
          "street"=>"kaka", 
          "street-cont"=>"", 
          "city"=>"Sunnyvale", 
          "zip"=>"94085", 
          "state-id"=>"10018", 
          "country-id"=>"1214", 
          "phone"=>"11"}, 
        "home-address"=>{
          "first-name"=>"kaka", 
          "m"=>"", 
          "last-name"=>"kaka", 
          "street"=>"kaka", 
          "street-cont"=>"", 
          "city"=>"Sunnyvale", 
          "zip"=>"94085", 
          "state-id"=>"10018", 
          "country-id"=>"1214", 
          "work-phone"=>"11"}, 
        "line-items"=>[
          {"variant-id"=>"4", "quantity"=>"1", "price"=>"341.00", "image"=>"http://demo.abovegem.com:11001/images/noimage/product.jpg", "pv"=>"300", "name"=>"Basic 10GO Set"}, 
          {"variant-id"=>"14", "quantity"=>"1", "pv"=>"0", "price"=>"49.00", "image"=>"http://demo.abovegem.com:11001/images/noimage/product.jpg", "name"=>"Membership"}], 
        "creditcard"=>{
          "number"=>"4111111111111111", 
          "expiration-year"=>"2016", 
          "expiration-month"=>"3", 
          "cvv"=>"111"}, 
        "billing-address"=>{
          "first-name"=>"kaka", 
          "last-name"=>"kaka", 
          "street"=>"kaka", 
          "street-cont"=>"", 
          "city"=>"Sunnyvale", 
          "zip"=>"94085", 
          "state-id"=>"10018", 
          "country-id"=>"1214", 
          "phone"=>"11"}
        }
      VCR.use_cassette('registration_create_with_invalid_password') do
        resp = API::Registration.create(params, nil)
        expect(resp).not_to be_success
        expect(resp.error_message).to eq('Invalid password.')
      end
    end

  end

  describe "CREATE in Antigua and Barbuda" do
    it "should response success home address valid" do
      params = {
        "first-name" => "kk",
        "m" => "",
        "last-name" => "kkk",
        "street" => "kkk",
        "street-cont" => "",
        "city" => "kkk",
        "zip" => "",
        "state-id" => "",
        "country-id" => "1008",
        "work-phone" => "99",
      }
      resp = API::Base.send_request(:post, params.dup.to_hash.update(path: '/v2/addresses/home/validate'))
      expect(resp).to be_success
    end

    it "should response success shipping address valid" do
      params = {
        "first-name" => "kk",
        "m" => "",
        "last-name" => "kkk",
        "street" => "kkk",
        "street-cont" => "",
        "city" => "kkk",
        "zip" => "",
        "state-id" => "",
        "country-id" => "1008",
        "phone" => "99",
      }
      resp = API::Base.send_request :post, params.dup.to_hash.update(path: '/v2/addresses/shipping/validate')
      expect(resp).to be_success
    end

    it "should response success shipping address valid" do
      params = {
        "shipping-method-id" => "108",
        "shipping-address" => {
          "first-name" => "kk",
          "m" => "",
          "last-name" => "kkk",
          "street" => "kkk",
          "street-cont" => "",
          "city" => "kkk",
          "zip" => "",
          "state-id" => "",
          "country-id" => "1008",
          "phone" => "99"
        },
        "billing-address" => {
          "first-name" => "kk",
          "m" => "",
          "last-name" => "kkk",
          "street" => "kkk",
          "street-cont" => "",
          "city" => "kkk",
          "zip" => "",
          "state-id" => "",
          "country-id" => "1008",
          "phone" => "99"
        },
        "home-address" => {
          "first-name" => "kk",
          "m" => "",
          "last-name" => "kkk",
          "street" => "kkk",
          "street-cont" => "",
          "city" => "kkk",
          "zip" => "",
          "state-id" => "",
          "country-id" => "1008",
          "work-phone" => "99"
        },
        "line-items" => [
          {
            "variant-id" => "4",
            "quantity" => "1",
            "price" => "341.00",
            "image" => "http://demo.abovegem.com:11001/images/noimage/product.jpg",
            "pv" => "300",
            "name" => "Basic 10GO Set"
          },
          {
            "variant-id" => "14",
            "quantity" => "1",
            "pv" => "0",
            "price" => "49.00",
            "image" => "http://demo.abovegem.com:11001/images/noimage/product.jpg",
            "name" => "Membership"
          }
        ],
        "role-code" => "D",
      }
      resp = API::Registrations::Adjustment.index(params.dup.to_hash)
      expect(resp).to be_success
    end

    it "should create success" do
      account = "sky007"
      params = {
        "special-instructions" => "",
        "language" => "English",
        "payment-method-id" => "3003",
        "shipping-method-id" => "108",
        "user-info" => {
          "sponsor" => "101",
          "role-code" => "D",
          "login" => account,
          "password" => account,
          "email" => "#{account}@123.com",
          "birthday" => "1989-5-5",
          "social-security-number" => "",
          "tax-id" => "",
          "country-iso" => "AG"
        },
        "shipping-address" => {
          "first-name" => "k",
          "m" => "",
          "last-name" => "k",
          "street" => "k",
          "street-cont" => "",
          "city" => "k",
          "zip" => "",
          "state-id" => "",
          "country-id" => "1008",
          "phone" => "99"
        },
        "home-address" => {
          "first-name" => "k",
          "m" => "",
          "last-name" => "k",
          "street" => "k",
          "street-cont" => "",
          "city" => "k",
          "zip" => "",
          "state-id" => "",
          "country-id" => "1008",
          "work-phone" => "99"
        },
        "line-items" => [
          {
            "variant-id" => "4",
            "quantity" => "1",
            "price" => "341.00",
            "image" => "http://demo.abovegem.com:11001/images/noimage/product.jpg",
            "pv" => "300",
            "name" => "Basic 10GO Set"
          },
          {
            "variant-id" => "14",
            "quantity" => "1",
            "pv" => "0",
            "price" => "49.00",
            "image" => "http://demo.abovegem.com:11001/images/noimage/product.jpg",
            "name" => "Membership"
          }
        ],
        "creditcard" => {
          "number" => "4111111111111111",
          "expiration-year" => "2016",
          "expiration-month" => "3",
          "cvv" => "111"
        },
        "billing-address" => {
          "first-name" => "k",
          "last-name" => "k",
          "street" => "k",
          "street-cont" => "",
          "city" => "k",
          "zip" => "",
          "state-id" => "",
          "country-id" => "1008",
          "phone" => "99"
        },
        "action" => "create",
        "controller" => "registration",
        "X-Authentication-Token" => ""
      }
      VCR.use_cassette('registration_create_country_1008') do
        resp = API::Registration.create(params, nil)
        expect(resp).to be_success
      end
    end
  end
end
