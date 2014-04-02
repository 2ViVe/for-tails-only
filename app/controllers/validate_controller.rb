class ValidateController < ActionController::Base
  
  def check_sponsor 
 
      if (params[:sponsor].to_i < 10) || (params[:sponsor].to_i >= 1000 && params[:sponsor].to_i < 10000)
        params[:sponsor].concat("01")
      end
      if params[:show_name].blank?
         render text: API::Sponsor.verify(params[:sponsor]).success?
      else
         render json: API::Sponsor.verify(params[:sponsor]).body
      end
   
  end
  
  def home_address
    res = API::Base.send_request :post, params.dup.to_hash.update(path: '/v2/addresses/home/validate')
    if res.body["failures"].length > 0
      render :text => res.body["failures"][0]["message"]
    else
      render :text => true
    end
  end
  
  def billing_address
    res = API::Base.send_request :post, params.dup.to_hash.update(path: '/v2/addresses/billing/validate')
    if res.body["failures"].length > 0
      render :text => res.body["failures"][0]["message"]
    else
      render :text => true
    end
  end
  
  def shipping_address
    res = API::Base.send_request :post, params.dup.to_hash.update(path: '/v2/addresses/shipping/validate')
    if res.body["failures"].length > 0
      render :text => res.body["failures"][0]["message"]
    else
      render :text => true
    end
  end

  def web_address
    res = API::Base.send_request :post, params.dup.to_hash.update(path: '/v2/addresses/website/validate')
    if res.body["failures"].length > 0
      render :text => res.body["failures"][0]["message"]
    else
      render :text => true
    end
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