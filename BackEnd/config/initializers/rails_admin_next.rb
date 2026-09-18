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
    unless _current_user
      redirect_to "/admin/auth/login" unless request.path == "/admin/auth/login"
    end
  end

  config.current_user_method do
    User.find_by(id: session[:admin_user_id])
  end

  config.authorize_with do
    unless request.path == "/admin/auth/login" || _current_user&.administrator?
      render plain: "Forbidden", status: :forbidden
    end
  end

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