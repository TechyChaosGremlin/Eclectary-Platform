module Api
  module V1
    class OrdersController < BaseController
      include Authentication

      def index
        orders = user_orders

        render json: {
          data: orders.map { |order| OrderSerializer.new(order).as_json }
        }
      end

      def show
        order = user_orders.find(params[:id])

        render json: {
          data: OrderSerializer.new(order).as_json
        }
      end

      def create
        order = Order.new(order_params.merge(user_id: current_user.id))

        if order.save
          render json: {
            data: OrderSerializer.new(order).as_json
          }, status: :created
        else
          render json: {
            errors: order.errors.full_messages
          }, status: :unprocessable_entity
        end
      end

      private

      def order_params
        params.require(:order).permit(:status)
      end

      def user_orders
        Order.where(user: current_user)
      end
    end
  end
end
