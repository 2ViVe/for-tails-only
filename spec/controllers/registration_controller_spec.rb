require 'spec_helper'

describe RegistrationController do

  describe "new" do
    it "should get step 1" do
      VCR.use_cassette('step_1') do
        get :new
        expect(response).to render_template('new')
        expect(assigns[:countries].length).to eq(42)
        expect(assigns[:states].length).to eq(57)
        expect(assigns[:languages].length).to eq(4)
      end
    end    
  end

  describe "create" do
    it "should create order" do
      VCR.use_cassette('registration_create') do
        reg_name = 'kaka77'
        post :create, {"special-instructions"=>"", "language"=>"English", "payment-method-id"=>"3003", "shipping-method-id"=>"4", "user-info"=>{"sponsor"=>"101", "role-code"=>"D", "login"=>reg_name, "password"=>reg_name, "email"=>"#{reg_name}@123.com", "birthday"=>"1989-3-4", "social-security-number"=>"222333444", "tax-id"=>"222333444", "country-iso"=>"US"}, "shipping-address"=>{"first-name"=>"kaka", "m"=>"", "last-name"=>"kaka", "street"=>"kaka", "street-cont"=>"", "city"=>"Sunnyvale", "zip"=>"94085", "state-id"=>"10018", "country-id"=>"1214", "phone"=>"111"}, "home-address"=>{"first-name"=>"kaka", "m"=>"", "last-name"=>"kaka", "street"=>"kaka", "street-cont"=>"", "city"=>"Sunnyvale", "zip"=>"94085", "state-id"=>"10018", "country-id"=>"1214", "work-phone"=>"111"}, "line-items"=>{"0"=>{"variant-id"=>"4", "quantity"=>"1", "price"=>"341.00", "image"=>"http://demo.abovegem.com:11001/images/noimage/product.jpg", "pv"=>"300", "name"=>"Basic 10GO Set"}, "1"=>{"variant-id"=>"14", "quantity"=>"1", "pv"=>"0", "price"=>"49.00", "image"=>"http://demo.abovegem.com:11001/images/noimage/product.jpg", "name"=>"Membership"}}, "creditcard"=>{"number"=>"4111111111111111", "expiration-year"=>"2018", "expiration-month"=>"6", "cvv"=>"111"}, "billing-address"=>{"first-name"=>"kaka", "last-name"=>"kaka", "street"=>"kaka", "street-cont"=>"", "city"=>"Sunnyvale", "zip"=>"94085", "state-id"=>"10018", "country-id"=>"1214", "phone"=>"111"}}
        expect(response).to be_success
        resp = JSON.parse(response.body)['response']
        expect(resp['sponsor']).to eq({"name"=>"ZVI ", "email"=>"", "phone"=>"(888) 937-9648"})
        expect(resp['order']['item-total']).to eq(390)
      end
    end
  end

end
