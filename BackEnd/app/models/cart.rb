class Cart < ApplicationRecord
  belongs_to :user

  has_many :cart_items, dependent: :destroy

  validates :user, presence: true
end
