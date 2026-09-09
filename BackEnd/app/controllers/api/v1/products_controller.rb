module Api
  module V1
    class ProductsController < BaseController
      def index
        render json: { message: "Products endpoint is not implemented yet." }
      end

      def show
        render json: {
          message: "Product endpoint is not implemented yet.",
          id: params[:id]
        }
      end
    end
  end
end
