class Api::V1::UsersController < Api::V1::BaseController
  include Authentication
  include Authorization

  before_action :authenticate_user, only: %i[me index]
  require_role :administrator, only: [ :index ]

  def index
    render json: User.all.map { |user| { id: user.id, email: user.email, role: user.role } }
  end

  def create
    user = User.new(user_params)

    if user.save
      render json: {
        id: user.id,
        email: user.email,
        role: user.role
      }, status: :created
    else
      render json: {
        errors: user.errors.full_messages
      }, status: :unprocessable_entity
    end
  end

  def me
  render json: {
    id: current_user.id,
    email: current_user.email,
    role: current_user.role
  }
end

  private

  # Public self-registration must never allow escalation to administrator.
  def user_params
    permitted = params.require(:user).permit(
      :email,
      :password,
      :password_confirmation,
      :role
    )
    permitted[:role] = "customer" if permitted[:role] == "administrator"
    permitted
  end
end
