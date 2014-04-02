module AutoshipsHelper

  def get_role_codes(role_name_short)
    ::API::Autoship::FOR[role_name_short]
  end

  def role_code_price(prices, role_name_short)
    prices.select{|p| p['role-code'] == get_role_codes(role_name_short).first}.first['price']
  end

end