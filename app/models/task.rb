class Task < ApplicationRecord
  paginates_per 33

  belongs_to :status

  validates :name, presence: true
end
