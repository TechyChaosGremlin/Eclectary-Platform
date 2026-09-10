class CategorySerializer
  def initialize(category)
    @category = category
  end

  def as_json
    {
      id: @category.id,
      name: @category.name,
      slug: @category.slug,
      created_at: @category.created_at,
      updated_at: @category.updated_at
    }
  end
end