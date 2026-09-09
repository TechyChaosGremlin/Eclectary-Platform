class Api::V1::SessionsController < Api::V1::BaseController
  def create
    user = User.find_by(email: params[:email])

    if user&.authenticate(params[:password])
      token = JsonWebToken.encode(user_id: user.id)

      render json: {
        user: {
          id: user.id,
          email: user.email,
          role: user.role
        },
        token: token
      }, status: :ok
    else
      render json: {
        error: "Invalid email or password"
      }, status: :unauthorized
    end
  end
end