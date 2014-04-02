ApiConfigYml = YAML.load_file(Rails.root.join("config/api_config.yml"))[Rails.env].symbolize_keys

module ApiConfig
  NODE_SERVICE = ApiConfigYml[:node]
  EMAIL_SERVICE = ApiConfigYml[:email]
  ADMIN_SERVICE = ApiConfigYml[:admin]
  NODE_KEY = ApiConfigYml[:node_key]
  NODE_SECRET = ApiConfigYml[:node_secret]
  DASHBOARD_SERVICE = ApiConfigYml[:dashboard]
  GRIDFS = ApiConfigYml[:gridfs]
end