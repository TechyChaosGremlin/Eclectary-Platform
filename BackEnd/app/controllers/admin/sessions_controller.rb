module Admin
  class SessionsController < ActionController::Base
    def new
    end

    def create
      user = User.find_by(email: params[:email])

      if user&.authenticate(params[:password]) && user.administrator?
        session[:admin_user_id] = user.id
        redirect_to "/admin"
      else
        render plain: "Invalid administrator credentials", status: :unauthorized
      end
    end

    def destroy
      reset_session
      redirect_to "/admin/auth/login"
    end
  end
end