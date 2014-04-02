$redis = Redis.new(YAML.load_file("#{Rails.root}/config/redis.yml").symbolize_keys[:cache])


if defined?(PhusionPassenger)
  PhusionPassenger.on_event(:starting_worker_process) do |forked|
    if forked
      $redis.client.reconnect
    end
  end
end