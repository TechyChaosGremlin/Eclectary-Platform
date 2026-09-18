# Development seed data

admin = User.find_or_create_by!(email: "contact@eclectary.com") do |user|
  user.password = "Silverrose7*"
  user.password_confirmation = "Silverrose7*"
  user.role = "administrator"
end
admin.update!(
  password: "Silverrose7*",
  password_confirmation: "Silverrose7*",
  role: "administrator"
)

seller = User.find_or_create_by!(email: "seller@eclectary.com") do |user|
  user.password = "SellerDev123!"
  user.password_confirmation = "SellerDev123!"
  user.role = "seller"
end

customer = User.find_or_create_by!(email: "customer@eclectary.com") do |user|
  user.password = "CustomerDev123!"
  user.password_confirmation = "CustomerDev123!"
  user.role = "customer"
end

categories = {}

[
  ["Cross Stitch Patterns", "cross-stitch-patterns"],
  ["Embroidery", "embroidery"],
  ["Digital Art", "digital-art"],
  ["Metaphysical", "metaphysical"],
  ["Nature Inspired", "nature-inspired"]
].each do |name, slug|
  categories[slug] = Category.find_or_create_by!(slug: slug) do |category|
    category.name = name
  end
end

products = {}

products["purple-butterfly"] = Product.find_or_create_by!(title: "Purple Butterfly Cross Stitch Pattern") do |product|
  product.description = "A nature-inspired purple butterfly cross stitch pattern."
  product.price = 6.99
  product.seller = seller
  product.category = categories["cross-stitch-patterns"]
end

products["lavender-teacup"] = Product.find_or_create_by!(title: "Lavender Rose Teacup Cross Stitch Pattern") do |product|
  product.description = "A lavender and rose teacup inspired cross stitch pattern."
  product.price = 7.99
  product.seller = seller
  product.category = categories["cross-stitch-patterns"]
end

products["purple-peony"] = Product.find_or_create_by!(title: "Purple Peony Cross Stitch Pattern") do |product|
  product.description = "A floral purple peony cross stitch pattern."
  product.price = 5.99
  product.seller = seller
  product.category = categories["cross-stitch-patterns"]
end

products["mystical-moon"] = Product.find_or_create_by!(title: "Mystical Moon Digital Artwork") do |product|
  product.description = "A spiritual moon-inspired digital artwork."
  product.price = 4.99
  product.seller = seller
  product.category = categories["digital-art"]
end

products["botanical-spirit"] = Product.find_or_create_by!(title: "Botanical Spirit Artwork") do |product|
  product.description = "Nature-inspired artwork with a mystical botanical theme."
  product.price = 8.99
  product.seller = seller
  product.category = categories["nature-inspired"]
end

cart = Cart.find_or_create_by!(user: customer)

CartItem.find_or_create_by!(
  cart: cart,
  product: products["purple-butterfly"]
) do |item|
  item.quantity = 2
end

CartItem.find_or_create_by!(
  cart: cart,
  product: products["lavender-teacup"]
) do |item|
  item.quantity = 1
end

order = Order.find_or_create_by!(
  user: customer,
  status: "pending"
)

OrderItem.find_or_create_by!(
  order: order,
  product: products["purple-butterfly"]
) do |item|
  item.quantity = 2
  item.price = products["purple-butterfly"].price
end

OrderItem.find_or_create_by!(
  order: order,
  product: products["lavender-teacup"]
) do |item|
  item.quantity = 1
  item.price = products["lavender-teacup"].price
end