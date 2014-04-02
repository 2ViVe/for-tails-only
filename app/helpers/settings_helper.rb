module SettingsHelper
  def trans_countries_for_select(countries)
    return [] unless countries
    countries.inject([]) { |r,i| r << [i["name"], i["id"]];r }
  end
end