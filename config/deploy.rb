#require 'bundler/capistrano'
#require 'rvm/capistrano'
set :application, 'zoivi'
set :repo_url, 'git@github.com:2ViVe/zoivi.git'
I18n.enforce_available_locales = false
# ask :branch, proc { `git rev-parse --abbrev-ref HEAD`.chomp }
#set :default_env, { path: "/www/web/wifitang/production/shared/bin:$PATH" }
set :rvm_ruby_string, 'ruby-2.0.0-p353@global'
set :rvm_type, :system


# set :deploy_to, '/var/www/my_app'
set :scm, :git
set :deploy_via, :remote_cache
set :format, :pretty
# set :log_level, :debug
# set :pty, true
set :rvm_type, :user


set :linked_files, %w{config/database.yml config/redis.yml config/api_config.yml}
set :linked_dirs, %w{bin log tmp/pids tmp/cache tmp/sockets vendor/bundle public/system public/uploads public/pdf}

# set :default_env, { path: "/opt/ruby/bin:$PATH" }
set :keep_releases, 5



namespace :deploy do

  desc 'Restart application'
  task :restart do
    on roles(:app), in: :sequence, wait: 5 do
      # Your restart mechanism here, for example:
      execute :touch, release_path.join('tmp/restart.txt')
    end
  end



  after :restart, :clear_cache do
    on roles(:web), in: :groups, limit: 3, wait: 10 do
      # Here we can do anything such as:
      # within release_path do
      #   execute :rake, 'cache:clear'
      # end
    end
  end



#  before :finishing, "deploy:migrate", 'deploy:compile_assets'
  after :finishing, 'deploy:cleanup'

end

      
