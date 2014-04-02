module RedisObject
  
  class << self
    
    def set_objects(key, activerecord, expires_at = 1.day)
      $redis.setex(key, expires_at, Marshal.dump(activerecord)) rescue nil
    end
  
    def get_objects(key)
      result = $redis.get(key)
      Marshal.load(result) if result
    end
    
  end
  
end