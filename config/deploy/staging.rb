set :stage, :production

# Simple Role Syntax
# ==================
# Supports bulk-adding hosts to roles, the primary
# server in each group is considered to be the first
# unless any hosts have the primary property set.
role :app, %w{itadmin@192.168.199.126}
role :web,  %w{itadmin@192.168.199.126}

set :rvm_type, :user
set :rvm_ruby_version, '2.0.0-p353'

# Extended Server Syntax
# ======================
# This can be used to drop a more detailed server
# definition into the server list. The second argument
# something that quacks like a hash can be used to set
# extended properties on the server.
server '192.168.199.126', user: 'itadmin', roles: %w{web app}

set :deploy_to, '/var/www/zoivi'