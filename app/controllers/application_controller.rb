class ApplicationController < ActionController::Base
  include API::Controller
  helper_method :current_user
  protect_from_forgery with: :exception
  before_filter :login_required, :current_cart, :profile_validate

  rescue_from 'API::Base::APITokenUnauthorized' do |exception|
    reset_session
    cookies.delete(:remember_token)
    redirect_to signin_path, alert: "We didn't recognize your ID and password."
  end
  
  def current_cart
    @token = session[:token]
    @shopping_cart_key  = "closet:shopping_cart:user:#{current_user.distributor_id}"
    @cart = RedisObject.get_objects(@shopping_cart_key) 
    @cart ||= Cart.new
  end
  
  def profile_validate
    if session[:check_profile].nil?
      response = API::User.profile_validate(@token)
      @home_address = response["home-address-failures"]
      @billing_address = response["billing-address-failures"]
      @shipping_address = response["shipping-address-failures"]
      @website_address = response["website-address-failures"]
      if (@home_address.present? || @billing_address.present? || @shipping_address.present? || @website_address.present?) && controller_name != "settings"
        redirect_to settings_path and return
      else
        session[:check_profile] = true
      end
    end
  end
  
  # def set_test_token
  #   #session[:test_token] = session[:new_test] = nil#"MTAwNzQwMTo6MTM0NTU6Om1zZWV2ZXJzOjptYW9tdzYwMTo6MTM5MzA4MzU0OTI1Njo6VUxuYVkxVDNtLzh5RUNaNi9QNk9WT3o1QzNlVGZoeTVJaFFsM2c2ZXNlVT0="
  #   if session[:test_token].nil? && session[:new_test].nil?
  #     session[:new_test] ||= SecureRandom.uuid
  #     params = {:user => "1000136301", :password => "mas8OGlue"}
  #     response = API::UserSession.create(params)
  #     session[:test_token] = response.body["authentication-token"]
  #   end
  #   @token = session[:test_token]
  # end
  
  
  def start_shopping
    redirect_to start_shopping_path and return if @cart.order_type.nil?
  end

  def countries_and_states 
    @countries_api = API::Country.list.body
    @countries = @countries_api.collect{|a| [a["name"], a["id"]]}
    @states = @countries_api.select{|a| a['iso'] == 'US'}.first['states'].collect{|a| [a['name'], a['id']]}
  
    @countries_states = Hash.new
    @countries_api.each do |c|
      @countries_states[c['id']] = c['states']
    end
  end
  
end
