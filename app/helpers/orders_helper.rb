module OrdersHelper
  
  def shpping_method_options shipping_methods, current_shipping_method
    options = ""
    shipping_methods.each do |shipping_method|
      option_attr = {:value => shipping_method["id"], :"data-address-changeable" => shipping_method["shipping-address-changeable"]}
      option_attr.merge!(:selected => 'selected') if current_shipping_method == shipping_method["id"]
      options << content_tag("option", shipping_method["name"], option_attr)
    end
    options
  end
  
  def payment_method_options payment_methods
    options = ""
    payment_methods.each do |payment_method|
      option_attr = {:value => payment_method["id"], :"data-is-creditcard" => payment_method["is-creditcard"]}
      option_attr.merge!(:selected => 'selected') if payment_method["is-creditcard"] == true
      options << content_tag("option", payment_method["name"], option_attr)
    end
    options
  end
  
  def address_name address
    [address["first-name"], address["m"], address["last-name"]] * " "
  end
  
  def full_address address
    
    address_format = []
    address_format << address["city"] if address["city"].present?
    address_format << address["state"] if address["state"].present?
    address_format << address["zip"] if address["zip"].present?
    address_format << address["country"] if address["country"].present? 
    
    html = ""
    html << content_tag("li", address["street"], class: "locality")
    html << content_tag("li", address["street-cont"], class: "locality") if address["street-cont"].present?
    # html <<  content_tag("li", ([address["city"], address["state"], address["zip"], address["country"]] * ", "), class: "locality")
    html <<  content_tag("li", (address_format * ", "), class: "locality")
    html
  end  
    
  def current_ship_method shipping_methods, current_shipping_method
    shipping_methods.each do |shipping_method|
      return shipping_method if current_shipping_method == shipping_method["id"]
    end
  end
  
  def current_payment_method payment_methods, current_payment_method
    payment_methods.each do |payment_method|
      return payment_method if current_payment_method == payment_method["id"]
    end
  end
  
  def change_billing_address_ajax_url
    action_name == "checkout" ? billing_address_validate_checkout_index_path : billing_address_update_checkout_index_path
  end
  
end
