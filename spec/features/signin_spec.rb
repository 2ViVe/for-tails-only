require "spec_helper"

describe "the signin process", :type => :feature do

  it "step 1" do
    visit '/signout'
    visit '/signin'
    within(".sign-in-left") do
      fill_in 'user', with: '101201'
      fill_in 'Password', with: 'rich2898'
    end
    click_button 'Sign In'
    expect(page).to have_content 'WELCOME'
  end
end