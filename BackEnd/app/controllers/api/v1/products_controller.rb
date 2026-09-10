module Api
  module V1
    class ProductsController < BaseController
      def index
        products = Product.all

        render json: {
          data: products.map { |product| ProductSerializer.new(product).as_json },
          pagination: {
            page: 1,
            per_page: products.length,
            total: products.length
          }
        }
      end

      def show
        product = Product.find(params[:id])

        render json: {
          data: ProductSerializer.new(product).as_json
        }
      end
    end
  end
end