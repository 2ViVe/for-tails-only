module API
  class Registration < Base

    class << self
      # email|login|ssn
      def available(options)
        params = { path: '/v2/registrations/availabilities' }
        params[:email] = options[:email] if options[:email].present?
        params[:login] = options[:login] if options[:login].present?
        params['ssn'] = options['social-security-number'] if options['social-security-number'].present?
        send_request(:get, params)
      end

      def create(options, token)
        send_request(:post, options.update({path: '/v2/registrations', :'X-Authentication-Token' => token}))
      end
    end
  end
end
