class User < ApplicationRecord
  has_secure_password

  validates :email, presence: true, uniqueness: true
  validates :role, presence: true, inclusion: { in: %w[customer seller administrator] }

  # Defense-in-depth: never let password_digest leak through serialization,
  # even if a controller accidentally renders a raw user object.
  def as_json(options = {})
    super(options.merge(except: Array(options[:except]) + [ :password_digest ]))
  end

  def customer?
    role == "customer"
  end

  def seller?
    role == "seller"
  end

  def administrator?
    role == "administrator"
  end
end
