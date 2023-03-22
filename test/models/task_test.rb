require 'test_helper'

class TaskTest < ActiveSupport::TestCase
  test "should not save task without name" do
    task = Task.new
    assert_not task.save
  end

  test "should save task with valid attributes" do
    status = Status.create(name: 'New')
    task = Task.new(name: 'Do laundry', status_id: status.id)
    assert task.save
  end

  test "should belong to a status" do
    assert_respond_to Task.new, :status
  end

  test "should paginate per 33 tasks" do
    assert_equal 33, Task.default_per_page
  end
end
