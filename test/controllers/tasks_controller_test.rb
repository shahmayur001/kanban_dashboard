require 'test_helper'

class TasksControllerTest < ActionDispatch::IntegrationTest
  setup do
    @status = Status.create!(name: 'Complete')
    @task = Task.create!(name: 'Test task', status: @status)
  end

  test "should update task" do
    patch task_url(@task), params: { task: { name: "Updated task name", status_id: @status.id } }
    assert_response :success
  end

  test "should not update task with invalid params" do
    patch task_url(@task), params: { task: { name: "", status_id: @status.id } }
    assert_response :unprocessable_entity
  end
end
