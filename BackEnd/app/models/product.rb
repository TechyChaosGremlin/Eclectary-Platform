class Product < ApplicationRecord
  belongs_to :seller, class_name: "User"
  belongs_to :category
  validates :title, presence: true
  validates :price, presence: true, numericality: { greater_than_or_equal_to: 0 }
end