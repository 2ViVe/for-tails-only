class User
  attr_accessor :login, :next_renewal_date, :birth_date, :company, :distributor_id, :email, :image_url, :registration_date, :packtype_id, :role_name, :role_code, :name, :packtype_name
  attr_reader :user_id

  def initialize(options = {})
    opts               = options.dup.symbolize_keys
    @login             = opts[:login]
    @company           = opts[:company]
    @email             = opts[:email]
    @name              = opts[:name]  
    @next_renewal_date = opts[:next_renewal_date] || opts[:'next-renewal-date']
    @birth_date        = opts[:birth_date]        || opts[:'birth-date']
    @distributor_id    = opts[:distributor_id]    || opts[:'distributor-id']
    @image_url         = opts[:image_url]         || opts[:'image-url']
    @user_id           = opts[:user_id]           || opts[:'user-id']
    @registration_date = opts[:registration_date] || opts[:'registration-date']
    @packtype_id       = opts[:packtype_id]       || opts[:'packtype-id']
    @role_name         = opts[:role_name]         || opts[:'role-name']
    @role_code         = opts[:role_code]         || opts[:'role-code']
    @packtype_name     = opts[:packtype_name]     || opts[:'packtype-name']
  end

  #@param[type] billing,home,shipping,website
  def country(token, type = 'home')
    response   = API::Address.get_address(token, type)
    Country.find(response[type]["country-id"])
  end

end
