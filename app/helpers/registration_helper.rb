module RegistrationHelper
  
  def product_image n
   image_tag n["images"].first.gsub(/large/,"small"), :alt => n["name"], :class => "packImg", :size => "50x50"
  end
  
  def product_image_url n
    n["images"].first.gsub(/large/,"small") rescue ''
  end
  
  def product_pv n
    n['variants'].first['commissions'].first['volume'] rescue 0
  end
  
  def product_price n, role_code
    case role_code
     when "D"
       n['variants'].first['prices'].select{|a| a['role-code'] == 'D'}.first['price'] rescue 9999
     when "P"
      n['variants'].first['prices'].select{|a| a['role-code'] == 'P'}.first['price'] rescue 9999
    end
  end

  
  def retail_price n
     n['variants'].first['prices'].select{|a| a['role-code'] == 'R'}.first['price'] rescue 9999
  end
  
  def variant_id n
    n['variants'].first['id']
  end
  
end
