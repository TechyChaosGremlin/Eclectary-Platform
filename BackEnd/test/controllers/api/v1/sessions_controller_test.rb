require "test_helper"

class Api::V1::SessionsControllerTest < ActionDispatch::IntegrationTest
  test "valid login returns a JWT and user info" do
    post "/api/v1/login", params: { email: users(:one).email, password: "password123" }

    assert_response :success
    body = JSON.parse(response.body)
    assert body["token"].present?
    assert_equal users(:one).id, body["user"]["id"]
    assert_equal "customer", body["user"]["role"]
    assert_not body["user"].key?("password_digest")
  end

  test "invalid password returns unauthorized" do
    post "/api/v1/login", params: { email: users(:one).email, password: "wrong-password" }

    assert_response :unauthorized
    assert_equal "Invalid email or password", JSON.parse(response.body)["error"]
  end

  test "unknown email returns unauthorized" do
    post "/api/v1/login", params: { email: "nobody@example.com", password: "password123" }

    assert_response :unauthorized
  end
end
