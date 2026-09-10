class OrderSerializer
  def initialize(order)
    @order = order
  end

  def as_json
    {
      id: @order.id,
      user_id: @order.user_id,
      status: @order.status,
      created_at: @order.created_at,
      updated_at: @order.updated_at
    }
  end
end