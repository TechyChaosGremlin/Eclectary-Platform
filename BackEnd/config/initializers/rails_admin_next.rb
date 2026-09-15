RailsAdminNext.config do |config|
  config.included_models = %w[
    User
    Product
    Category
    Cart
    CartItem
    Order
    OrderItem
  ]

  config.authenticate_with do
    unless session[:admin_user_id]
      redirect_to "/admin-login" unless request.path == "/admin-login"
  end
end

  config.current_user_method do
    User.find_by(id: session[:admin_user_id])
  end

  config.authorize_with do
    unless request.path == "/admin-login" || _current_user&.administrator?
      render plain: "Forbidden", status: :forbidden
    end
  end

  ### Popular gems integration

  ## == Devise ==
  # config.authenticate_with do
  #   warden.authenticate! scope: :user
  # end
  # config.current_user_method(&:current_user)

  ## == CancanCan ==
  # config.authorize_with :cancancan

  ## == Pundit ==
  # config.authorize_with :pundit

  ## == PaperTrail ==
  # config.audit_with :paper_trail, 'User', 'PaperTrail::Version'

  config.actions do
    dashboard
    index
    new
    export
    bulk_delete
    show
    edit
    delete
    show_in_app
  end
end