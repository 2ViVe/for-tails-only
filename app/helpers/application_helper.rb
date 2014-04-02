module ApplicationHelper
  
  ## 先这样..最后在和谐
  def include_sidebar
    return true if controller_name == "shopping_cart" && action_name == "start"
    return true if controller_name == "orders" && action_name == "index"
    return false if ["registration", "shopping_cart", "orders"].include? controller_name
    return false if controller_name == "products" && action_name == "show"
    return true if controller_name == "commissions"
    true
  end
  
  def variant_price variant
    price_info(variant["prices"])
  end
  
  def product_price product
    price_info(product["prices"])
  end
  
  def price_info prices
    retail_price = distributor_price = autoship_price = 0
    prices.each do |role|
      retail_price = role["price"] if role["role-code"] == "D"
      distributor_price = role["price"] if role["role-code"] == "R"
      autoship_price = role["price"] if role["role-code"] == "E"
    end
    {
      :retail => number_to_currency(retail_price), 
      :distributor => number_to_currency(distributor_price),
      :autoship => (autoship_price == 0 ? "$ 0.0" : number_to_currency(autoship_price))
    }
  end
  
  def show_cart_button cart
    @cart.items.size > 0 && !(controller_name == "shopping_cart" && action_name == "index") 
  end
  
  def header_status
    API::Dashboard.header_status(current_user.distributor_id)
  end
  
  def autoship_statu_text(curr_pvq)
    return 'Not Active' unless curr_pvq
    if curr_pvq >= 89
      "Active + "
    elsif curr_pvq < 89 && curr_pvq > 50
      "Active"
    else
      "Not Active"
    end
  end

  def show_class(class_name, controller_array, action_array)
    class_name if controller_array.include?(controller_name) and action_array.include?(action_name)
  end
  
end
