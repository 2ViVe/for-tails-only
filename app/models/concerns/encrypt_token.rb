require 'openssl'
require 'base64'
module Concerns
  module EncryptToken
    ENCRYPT_KEY = "admin-encrypt-key@@"
    class Blowfish  
      
      def self.cipher(mode, key, data)
        cipher = OpenSSL::Cipher::Cipher.new('bf-cbc').send(mode)
        cipher.key = Digest::SHA256.digest(key)
        cipher.update(data) << cipher.final
      end

      def self.encrypt(key, data)
        Base64.encode64(cipher(:encrypt, key, data)).chomp
      end

      def self.decrypt(key, text)
        cipher(:decrypt, key, Base64.decode64(text))
      end
    end
    
    def get_encrypted_admin_token_and_user_id(admin_token, user_id)
      Blowfish.encrypt(ENCRYPT_KEY, "#{admin_token},#{user_id}")    
    end
    
    def get_decrypted_admin_token_and_user_id(encrypted_admin_token_with_id)
      Blowfish.decrypt(ENCRYPT_KEY, encrypted_admin_token_with_id).split(",")
    end
    
    def get_decrypted_token(encrypted_token)
      Blowfish.decrypt(ENCRYPT_KEY, encrypted_token)
    end

    def get_encrypted_token(token)    
      Blowfish.encrypt(ENCRYPT_KEY, token)
    end

  end
end
