# encoding: utf-8
class RegistrationController < ApplicationController
  
  skip_before_filter :login_required, :current_cart, :profile_validate
  
  def new
    @roles = API::Role.list
    @countries_api = API::Country.list.body
    
    @countries = @countries_api.collect{|a| [a["name"], a["id"],{:iso => a["iso"]} ]}

    @countries.unshift(["United States", 1214, {:iso => "US"}])
    @states = @countries_api.select{|a| a['iso'] == 'US'}.first['states'].collect{|a| [a['name'], a['id']]}
  
    @countries_states = Hash.new
    @countries_api.each do |c|
      @countries_states[c['id']] = c['states']
    end
    @languages = ["English", "Chinese", "Español", "French"]
  end
  
  def create
 
    params['line-items'] = params['line-items'].map(&:last)
    params['autoship-line-items'] = params['autoship-line-items'].map(&:last) if params['autoship-line-items']
    
    data = API::Registration.create(params.dup.to_hash, session[:token])
    
    if data.body && data.body["order"]["payment-state"] == 'failed'
      data.meta["error"] = { "message" => 'Payment faild, please check your creditcard.' }
    end

    if data.meta["code"].to_s == "200" && data.body['order']['payment-state'] == 'paid'
      email = params["user-info"]["email"]
    
      if current_user.nil?
        session_response = API::UserSession.create({:user => params["user-info"]["login"], :password => params["user-info"]["password"], :client_ip =>request.remote_ip})
        if session_response.success?
          user_response = API::User.show(session_response.body['authentication-token'])
          if user_response.success?
            session[:user]  = User.new(user_response.body)
            session[:token] = session_response.body['authentication-token']
          end
        end
      end
    end
    
    render :json => {response: data.body, meta: data.meta}
  end
  
  def adjustments
   params['line-items'] = params['line-items'].map(&:last)
   data =  API::Registrations::Adjustment.index(params.dup.to_hash)
   format_data = data.body.map { |x| {'amount' =>x['amount'], 'label' =>x['label'].titleize} }
   render :json => {response: format_data, meta: data.meta}
  end
  
  def verify_sponsor
    r = API::Sponsor.verify(params[:id])
    if r.success?
     render :json => r.body
    else
    render :json =>  r.error_message
    end
  end
  
  
  
  def payment_methods
    render :json => API::Registrations::PaymentMethod.index("country-id" => params[:country_id]).body
  end
  
  def shipping_methods
    render :json => API::Registrations::ShippingMethod.index("country-id" => params[:country_id]).body
  end
  
  def countries
    states = Hash.new
    API::Country.list.body.each do |c|
      states[c['id']] = c['states']
    end
    render :json => states
  end
  
  def products
    @r = API::Product.index("country-id" => params[:country_id], "role-code" => params[:role_code]).body
    @products = @r['products']
    @taxons = @r['taxons'].sort_by{|a| a["position"]}
    @taxons.each do |t|
      t["products"] = @products.select{|a| a['taxon-id'] == t["id"]}
      t["sub-taxons"].each do |tt|
        tt["products"] = @products.select{|a| a['taxon-id'] == tt["id"]}
      end
    end
    
   @taxons.each do |t|
      t["sub-taxons"].reject!{|tt| tt["products"].blank?}
    end
    
    @taxons.reject!{|t| t['sub-taxons'].blank? && t['products'].blank?}
 
    if  params[:role_code] == 'R' || params[:role_code] == 'E'
      @entry_kit = nil
    end
    respond_to do |format|
      format.html  { render :layout => false}
      format.json  { render :json => @taxons }
    end
  end
  
  def check_sponsor
    render text: API::Sponsor.show(params[:sponsor]).success?
  end

  def check_email_or_login
    result = API::Registration.available(params)
    if result.success?
      render :json => result.body['available']
    else
      raise API::Base::RequestError, result.error_message
    end
  end
  
end
