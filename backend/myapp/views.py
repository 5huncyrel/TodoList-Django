from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import Todo
from .serializers import TodoSerializer

# Fetch all tasks
@api_view(['GET'])
def task_list(request):
    tasks = Todo.objects.all().order_by("-id")
    serializer = TodoSerializer(tasks, many=True)
    return Response(serializer.data)

# Fetch a single task by ID
@api_view(['GET'])
def task_detail(request, pk):
    try:
        task = Todo.objects.get(pk=pk)
    except Todo.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    
    serializer = TodoSerializer(task)
    return Response(serializer.data)

@api_view(['GET', 'POST'])
def task_create(request):
    if request.method == 'GET':
        # Retrieve all tasks
        tasks = Todo.objects.all()
        serializer = TodoSerializer(tasks, many=True)
        return Response(serializer.data)

    elif request.method == 'POST':
        # Retrieve request data before saving
        print("Received Data:", request.data)

        serializer = TodoSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET', 'PUT'])
def task_update(request, pk):
    try:
        task = Todo.objects.get(pk=pk)
    except Todo.DoesNotExist:
        return Response({"error": "Task not found"}, status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        # Retrieve the task before updating
        serializer = TodoSerializer(task)
        return Response(serializer.data)

    elif request.method == 'PUT':
        # Update the task
        print("Request Body for Update:", request.data)  # Debugging log
        serializer = TodoSerializer(task, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET', 'DELETE'])
def task_delete(request, pk):
    try:
        task = Todo.objects.get(pk=pk)
    except Todo.DoesNotExist:
        return Response({"error": "Task not found"}, status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        # Retrieve the task details before deletion
        serializer = TodoSerializer(task)
        return Response(serializer.data)

    elif request.method == 'DELETE':
        # Delete the task
        task.delete()
        return Response({"message": "Task deleted successfully"}, status=status.HTTP_204_NO_CONTENT)

