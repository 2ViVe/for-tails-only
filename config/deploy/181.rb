set :stage, :181

# Simple Role Syntax
# ==================
# Supports bulk-adding hosts to roles, the primary
# server in each group is considered to be the first
# unless any hosts have the primary property set.
role :app, %w{scrunner@192.168.20.181}
role :web,  %w{scrunner@192.168.20.181}

set :rvm_type, :user
set :rvm_ruby_version, '2.0.0-p353'

# Extended Server Syntax
# ======================
# This can be used to drop a more detailed server
# definition into the server list. The second argument
# something that quacks like a hash can be used to set
# extended properties on the server.
server '192.168.20.181', user: 'scrunner', roles: %w{web app}

set :deploy_to, '/var/www/zoivi/deploy'