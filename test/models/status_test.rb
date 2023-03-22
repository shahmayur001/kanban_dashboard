require 'test_helper'

class StatusTest < ActiveSupport::TestCase
  test "should not save status without name" do
    status = Status.new
    assert_not status.save
  end

  test "should save status with valid attributes" do
    status = Status.new(name: 'New')
    assert status.save
  end

  test "should have many tasks" do
    assert_respond_to Status.new, :tasks
  end
end
