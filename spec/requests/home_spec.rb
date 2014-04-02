require "spec_helper"

describe "Home" do

  it "redirect to signin without logged in" do
    get root_path
    expect(response).to redirect_to(signin_path)
  end

end