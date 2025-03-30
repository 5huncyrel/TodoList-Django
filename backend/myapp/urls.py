# myapp/urls.py
from django.urls import path
from . import views

urlpatterns = [
    path('fetch/', views.task_list, name='task-fetch'),  # Fetching all tasks
    path('create/', views.task_create, name='task-create'),  # Create a task
    path('<int:pk>/fetch/', views.task_detail, name='task-fetch-single'),  # Fetch a single task by ID
    path('<int:pk>/update/', views.task_update, name='task-update'),  # Update a task by ID
    path('<int:pk>/delete/', views.task_delete, name='task-delete'),  # DELETE a task by ID
]
