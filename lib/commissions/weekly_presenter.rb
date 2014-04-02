class Commissions::WeeklyPresenter
  attr_reader :commissions_dualteam,
              :commissions_fasttrack,
              :commissions_retail,
              :currency_symbol,
              :distributor_id,
              :int_fxrate,
              :start_week_date,
              :weekly_select_option_dates,
              :user_id

  #@param[User instance]
  def initialize(user, input_params)
    @weekly_select_option_dates = Commission.get_weekly_select_option_dates

    if input_params[:commission_date].present?
      commission_date = input_params[:commission_date]
    elsif @weekly_select_option_dates[Time.now.year].size > 0
      commission_date = @weekly_select_option_dates[Time.now.year][0][1]
    else
      commission_date = Time.now.strftime('%Y%m%d')
    end

    if not @weekly_select_option_dates.values.flatten.include?(commission_date)
      commission_date = @weekly_select_option_dates[@weekly_select_option_dates.first[0]][0][1]
    end

    query_params = {}
    query_params[:start_date] = @start_week_date = Commission.weekly_start_date(commission_date)
    @start_week_date          = (@start_week_date.to_date + 6.day).strftime('%Y%m%d') #get the date from DB, but display by adding 6 days, display the end of week (next friday)
    query_params[:distributor_id] = user.distributor_id
    query_params[:token]          = input_params[:token]

    @commissions_retail    = Commission.get_commissions_retail(query_params) rescue {}
    @commissions_fasttrack = Commission.get_commissions_fasttrack(query_params) rescue {}
    @commissions_dualteam  = Commission.get_commissions_dualteam(query_params)

    currency         = user.country(input_params[:token]).commission_currency
    @int_fxrate      = currency.client_fxrate.convert_rate rescue 0
    @currency_symbol = currency.symbol

    @distributor_id = user.distributor_id
    @user_id        = user.user_id
  end

end
