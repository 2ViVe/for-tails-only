module API
  class Role < Base

    class << self
      def list
        [
          {"id" => 2, "code" => 'D', "name" => "Independent Partner", "desc" => "Sign up for a new distributor and receive wholesale prices on all of our products."},
          {"id" => 5,"code" => 'P', "name" => "Preferred Customer", "desc" => "Enroll as a customer with potential to earn rewards, rebates and prizes in the future."},
          {"id" => 3, "code" => 'H',"name" => "Autoship Customer Enrollment", "desc" => "Sign up for a monthly AutoShip and receive discounts on all of our products."},
          {"id" => 6, "code" => 'R',"name" => "Retail Customer Enrollment", "desc" => "Sign up for a new Autoship Customer and receive a discount on product in exchange for signing up with an autoship template."},
        ]
      end
    end
  end
end


