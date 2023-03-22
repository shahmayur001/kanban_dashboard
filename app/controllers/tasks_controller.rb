# frozen_string_literal: true

class TasksController < ApplicationController
  # sets the task to update
  before_action :set_task, only: [:update]

  def index
    @tasks = Task.all.page(params[:page])
    @statuses = Status.all
  end

  def update
    if @task.update(task_params)
      render json: { success: "Task updated successfully"}
    else
      render json: { error: "Error updating task" }, status: :unprocessable_entity
    end
  end

  private

  # finds a specific task by ID
  def set_task
    @task = Task.find(params[:id])
  end

  def task_params
    params.require(:task).permit(:name, :description, :status_id)
  end
end
