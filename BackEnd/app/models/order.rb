class Order < ApplicationRecord
  belongs_to :user
  has_many :order_items, dependent: :destroy

  validates :status, presence: true

  def total
    order_items.sum { |item| item.quantity * item.price }
  end
end