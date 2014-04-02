class LineItem
  
  attr_accessor :variant_id, :quantity, :price
  
  def initialize
    @variant_id = nil
    @quantity = 0
    @price = 0
  end
  
end