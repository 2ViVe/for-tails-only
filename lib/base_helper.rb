module BaseHelper
  
  class << self
     
    def variant_price variant
      retail_price = distributor_price = 0
      variant["prices"].each do |role|
        retail_price = role["price"] if role["role-code"] == "D"
        distributor_price = role["price"] if role["role-code"] == "R"
      end
      {:retail => retail_price, :distributor => distributor_price}
    end
     
  end
    
end