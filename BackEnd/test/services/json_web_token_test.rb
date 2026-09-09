require "test_helper"

class JsonWebTokenTest < ActiveSupport::TestCase
  test "encodes and decodes a payload" do
    token = JsonWebToken.encode(user_id: 42)
    decoded = JsonWebToken.decode(token)

    assert_equal 42, decoded["user_id"]
  end

  test "decode returns nil for an expired token" do
    token = JsonWebToken.encode({ user_id: 42 }, 1.hour.ago)

    assert_nil JsonWebToken.decode(token)
  end

  test "decode returns nil for a garbage token" do
    assert_nil JsonWebToken.decode("not-a-real-token")
  end

  test "decode returns nil for a nil token" do
    assert_nil JsonWebToken.decode(nil)
  end
end
