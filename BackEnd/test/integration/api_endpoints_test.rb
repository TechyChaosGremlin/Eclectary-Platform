require "test_helper"

class ApiEndpointsTest < ActionDispatch::IntegrationTest
  def auth_headers(user)
    { "Authorization" => "Bearer #{JsonWebToken.encode(user_id: user.id)}" }
  end

  test "health returns the API status" do
    get "/api/v1/health"

    assert_response :success
    assert_equal({ "status" => "ok", "api_version" => "v1" }, JSON.parse(response.body))
  end

  test "products returns serialized data and pagination" do
    get "/api/v1/products"

    assert_response :success
    body = JSON.parse(response.body)
    assert_equal %w[data pagination], body.keys.sort
    assert_equal products.count, body["data"].length
    assert_equal products.count, body.dig("pagination", "total")
    assert_equal %w[category_id created_at description id price seller_id title updated_at], body["data"].first.keys.sort
  end

  test "categories returns serialized data" do
    get "/api/v1/categories"

    assert_response :success
    body = JSON.parse(response.body)
    assert_equal %w[data], body.keys.sort
    assert_equal categories.count, body["data"].length
    assert_equal %w[created_at id name slug updated_at], body["data"].first.keys.sort
  end

  test "orders returns serialized data" do
      get "/api/v1/orders", headers: auth_headers(users(:one))

    assert_response :success
    body = JSON.parse(response.body)
    assert_equal %w[data], body.keys.sort
      assert_equal Order.where(user: users(:one)).count, body["data"].length
    assert_equal %w[created_at id status updated_at user_id], body["data"].first.keys.sort
  end

    test "orders require authentication" do
      get "/api/v1/orders"

      assert_response :unauthorized
    end

  test "users me returns the authenticated user" do
    get "/api/v1/users/me", headers: auth_headers(users(:one))

    assert_response :success
    body = JSON.parse(response.body)
    assert_equal %w[created_at email id role updated_at], body.keys.sort
    assert_equal users(:one).id, body["id"]
    assert_equal users(:one).email, body["email"]
    assert_equal users(:one).role, body["role"]
  end
end