module Admin
  class BaseController < ActionController::Base
    before_action :require_administrator

    private

    def require_administrator
      return if current_user&.administrator?

      render plain: "Forbidden", status: :forbidden
    end

    def current_user
      # RailsAdminNext will need its own authentication
      # integration here.
      nil
    end
  end
end