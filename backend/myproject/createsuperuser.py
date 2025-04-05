import os
import django
from django.contrib.auth.models import User

# Setup Django environment
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'myproject.settings')
django.setup()

# Define the superuser details
username = 'admin'  
email = 'admin@gmail.com' 
password = 'admin123'  

# Check if the superuser already exists
if not User.objects.filter(username=username).exists():
    # Create a superuser
    User.objects.create_superuser(username=username, email=email, password=password)
    print(f"Superuser {username} created successfully.")
else:
    print(f"Superuser {username} already exists.")
