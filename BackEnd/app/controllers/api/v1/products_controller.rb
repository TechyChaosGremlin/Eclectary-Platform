module Api
  module V1
    class ProductsController < BaseController
      module Api
  module V1
    class BaseController < ApplicationController

      def health
        render json: { status: "ok", api_version: "v1" }
      end

    end
  end
end
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
