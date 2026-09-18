require "test_helper"

class AdminLogoutNavigationTest < ActionDispatch::IntegrationTest
  test "unauthenticated visitor is redirected to the admin login" do
    get "/admin"

    assert_redirected_to "/admin/auth/login"
  end

  test "authenticated administrator can log out from the admin navigation" do
    post "/admin/login", params: {
      email: users(:administrator).email,
      password: "password123"
    }

    assert_redirected_to "/admin"

    follow_redirect!

    assert_response :success
    assert_select "a[href='/admin/logout'][data-turbo-method='delete']", text: /Log Out/i

    delete "/admin/logout"

    assert_redirected_to "/admin/auth/login"
  end

  test "non-administrator is denied access to the admin" do
    administrator = users(:administrator)
    post "/admin/login", params: {
      email: administrator.email,
      password: "password123"
    }
    administrator.update!(role: "customer")

    get "/admin"

    assert_response :forbidden
  end

  test "session without a current user is redirected to the admin login" do
    administrator = users(:administrator)
    post "/admin/login", params: {
      email: administrator.email,
      password: "password123"
    }
    administrator.destroy!

    get "/admin"

    assert_redirected_to "/admin/auth/login"
  end
end