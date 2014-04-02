class Cart
  
  attr_reader :items, :total_price, :order_type, :order_id, :item_count
  
  def initialize
    @items = []
    @total_price = 0.0
    @order_type = nil
    @order_id = nil
    @item_count = 0 
  end
  
  def add_product(variant_id, price ,quantity = 1)
    set_item variant_id, price, quantity
    update_total_and_count
  end
  
  def set_order_type order_type
    @order_type = order_type
  end
  
  def del_product variant_id
    @items.delete_if{|item| item.variant_id == variant_id.to_i}
    update_total_and_count
  end
  
  def empty_cart
    @items = []
    @item_count = @total_price = 0
  end
  
  def update_cart cart
    return if @items.blank? || cart.items.blank?
    variants = []
    cart.items.map{|k| variants << [k.variant_id, k.quantity]}
    variants = Hash[variants]
    @items.each do |item|
      
      if variants.keys.include? item.variant_id
        item.quantity += variants[item.variant_id]
        variants.delete item.variant_id
      end
    end
    
    if variants.present?
      variants.to_a.each do |variant|
        @items << new_line_item(variant.first, variant.last)
      end
    end
    update_total_and_count
  end
  
  def update_items line_items
    # can't use @cart.itmes = @order.line_items -> can't dump hash with default proc
    @items = []
    line_items.each do |line_item|
      @items << new_line_item(line_item.variant_id, line_item.price, line_item.quantity)
    end
    update_total_and_count
  end
  
  private
  
  def set_item variant_id, price, quantity
    @items.each do |item|
      item.quantity += quantity if item.variant_id.to_i == variant_id.to_i
    end
    @items << new_line_item(variant_id, price, quantity) if @items.size == 0 || !@items.map(&:variant_id).include?(variant_id.to_i)
  end
  
  def new_line_item variant_id, price, quantity
    item = LineItem.new
    item.quantity = quantity
    item.variant_id = variant_id.to_i
    item.price = price
    item
  end
  
  def update_total_and_count 
    @total_price = @item_count = 0 and return if @items.size == 0
    @total_price = @items.inject(0){|sum, item| sum + item.price.to_f * item.quantity } 
    @item_count = @items.inject(0){|sum, item| sum + item.quantity } 
  end

end