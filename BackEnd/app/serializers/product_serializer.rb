class ProductSerializer
  def initialize(product)
    @product = product
  end

  def as_json
    {
      id: @product.id,
      title: @product.title,
      description: @product.description,
      price: @product.price,
      seller_id: @product.seller_id,
      category_id: @product.category_id,
      created_at: @product.created_at,
      updated_at: @product.updated_at
    }
  end
end