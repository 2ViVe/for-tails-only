module ProductsHelper
  
  def taxon_link_to(text, url_options = {}, html_options = {})
    html_options[:class] = 'active' if current_page?(url_options)
    link_to text, url_options, html_options
  end  
  
end
