Zoivi::Application.routes.draw do
  
  get "organization/frontline"
  get "documents" => "documents#index"
  get "documents/download" => "documents#download"
  get "password/reset"
  post 'password/reset_token'
  # get "products/index"
  
  
  #mount Rack::GridFS::Endpoint.new(:db => "zoivi", :lookup => :path), :at => "upload"
  # get "products/show"
  
  
#  mount Rack::GridFS::Endpoint.new(:db => Mongoid.database), :at => "gridfs"
  
  get 'contact' => "contact#show"
  
  get 'signup' => "registration#new"
  post 'signup' => "registration#create"
  
  
  get 'registration/products' => "registration#products"
  get 'registration/countries' => "registration#countries"
  get 'registration/payment_methods' => "registration#payment_methods"
  post 'registration/adjustments' => "registration#adjustments"
  get 'registration/shipping_methods' => "registration#shipping_methods"
  get 'verify_sponsor' => "registration#verify_sponsor"
  
  post 'validate/home_address' => "validate#home_address"
  post 'validate/billing_address' => "validate#billing_address"
  post 'validate/shipping_address' => "validate#shipping_address"
  
  post 'validate/web_address' => "validate#web_address"
  get 'validate/check_sponsor' => "validate#check_sponsor"
  get 'validate/check_email_or_login' => "validate#check_email_or_login"
  
  get '/genealogy',   :to => 'genealogy#genealogy'
  get '/genealogy_dualteam_data/:id.:format',  :to => 'genealogy#genealogy_dualteam_data'
  get '/genealogy_dualteam_path', :to => 'genealogy#genealogy_dualteam_path'
  get '/genealogy_dualteam_extreme_bottom', :to => 'genealogy#genealogy_dualteam_extreme_bottom'
    
  get  'signin' => 'sessions#new'
  post 'signin' => "sessions#create"
  get 'signout' => 'sessions#destroy'
  get "admin_authorize" => 'sessions#login_by_token'
  
  
  get 'forgot_pwd' => 'registration#forgot_pwd'
  post 'forgot_pwd' => 'registration#forgot_pwd_validate'

  root to: 'home#index'
  
  resources :products 
  get 'products/taxon/:name-:id' => 'products#taxon_product', :as => :taxon_product

  get 'shopping' => 'shopping_cart#start', as: :start_shopping

  resources :shopping_cart, :only => [:index] do
    collection do
      post :add_product
      post :update_cart
      post :set_order_type
      post :empty
      put :reset_order
    end
    member do
      delete :del_product
    end
  end
  
  resources :orders do
    collection do
      post :delivery_update
      get :checkout
    end
    member do 
      post :pay
      get :invoice
    end
  end
  
  resources :checkout, only: [] do
    collection do
      post :shipping_address_validate
      post :billing_address_validate
      post :shipping_address_update
      post :billing_address_update
      post :delivery_update_without_order
      post :delivery_update_with_order
    end
  end
  
  get 'orders/:id/checkout' => 'orders#checkout_with_order', :as => :checkout_with_order

  resources :autoships do
    collection do
      post :validate_address
      post :summary
      get  :products
    end
    member do
      delete :canceled
    end
  end

  resources :settings, :only => [:index] do 
    collection do 
      put :update_address
      post :update_personal_information
      post :reset_password
      post :update_account_info
    end
  end
  
  resources :commissions, :only => [] do
    collection do 
      get :e_wallet, :organization, :organization_dt
      post :datasource, :datasource_dt
      get :commissions_week
    end
  end
  
  
  resources :ranks
  resources :reports

  # The priority is based upon order of creation: first created -> highest priority.
  # See how all your routes lay out with "rake routes".

  # You can have the root of your site routed with "root"
  # root 'welcome#index'

  # Example of regular route:
  #   get 'products/:id' => 'catalog#view'

  # Example of named route that can be invoked with purchase_url(id: product.id)
  #   get 'products/:id/purchase' => 'catalog#purchase', as: :purchase

  # Example resource route (maps HTTP verbs to controller actions automatically):
  #   resources :products

  # Example resource route with options:
  #   resources :products do
  #     member do
  #       get 'short'
  #       post 'toggle'
  #     end
  #
  #     collection do
  #       get 'sold'
  #     end
  #   end

  # Example resource route with sub-resources:
  #   resources :products do
  #     resources :comments, :sales
  #     resource :seller
  #   end

  # Example resource route with more complex sub-resources:
  #   resources :products do
  #     resources :comments
  #     resources :sales do
  #       get 'recent', on: :collection
  #     end
  #   end

  # Example resource route with concerns:
  #   concern :toggleable do
  #     post 'toggle'
  #   end
  #   resources :posts, concerns: :toggleable
  #   resources :photos, concerns: :toggleable

  # Example resource route within a namespace:
  #   namespace :admin do
  #     # Directs /admin/products/* to Admin::ProductsController
  #     # (app/controllers/admin/products_controller.rb)
  #     resources :products
  #   end
end
