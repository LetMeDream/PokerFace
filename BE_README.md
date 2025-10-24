# Tribeclub Chat System

A comprehensive live chat system built with Django REST Framework for real-time communication between users and customer support agents.

## Features

### 🔐 Authentication System
- User registration and login
- Token-based authentication
- User profile management
- Online/offline status tracking

### 👥 User Management
- **ChatUser**: Extended user profiles with chat-specific information
- **Agent**: Customer support representatives with availability management
- Real-time status updates

### 💬 Chat System
- **ChatRoom**: Conversation management with status tracking
- **Message**: Text, image, and file message support
- **ChatSession**: Active session tracking
- **ChatNotification**: Real-time notifications

### 🎯 Key Capabilities
- Create and manage chat rooms
- Send messages with attachments
- Assign agents to chat rooms
- Mark messages as read/unread
- Edit messages
- Resolve and close chat rooms
- Real-time notifications
- Agent availability management

## API Endpoints

### Authentication
- `POST /api/auth/login/` - User login
- `POST /api/auth/register/` - User registration
- `POST /api/auth/logout/` - User logout

### Users
- `GET /api/users/` - List users
- `GET /api/users/me/` - Get current user profile
- `POST /api/users/update_status/` - Update online status

### Agents
- `GET /api/agents/` - List agents
- `GET /api/agents/available/` - Get available agents
- `POST /api/agents/{id}/toggle_availability/` - Toggle agent availability

### Chat Rooms
- `GET /api/chat-rooms/` - List chat rooms
- `POST /api/chat-rooms/` - Create new chat room
- `GET /api/chat-rooms/{id}/` - Get chat room details
- `POST /api/chat-rooms/{id}/assign_agent/` - Assign agent
- `POST /api/chat-rooms/{id}/resolve/` - Resolve chat
- `POST /api/chat-rooms/{id}/close/` - Close chat
- `GET /api/chat-rooms/{id}/messages/` - Get room messages

### Messages
- `GET /api/messages/` - List messages
- `POST /api/messages/` - Send new message
- `POST /api/messages/{id}/mark_read/` - Mark as read
- `PUT /api/messages/{id}/edit/` - Edit message

### Notifications
- `GET /api/notifications/` - List notifications
- `POST /api/notifications/{id}/mark_read/` - Mark notification as read
- `POST /api/notifications/mark_all_read/` - Mark all as read
- `GET /api/notifications/unread_count/` - Get unread count

## Installation & Setup

### Prerequisites
- Python 3.8+
- Django 5.2+
- Django REST Framework
- SQLite (default) or PostgreSQL

### Installation Steps

1. **Clone the repository**
```bash
cd ChatForLanding
```

2. **Activate virtual environment**
```bash
# Windows
env\Scripts\activate

# Linux/Mac
source env/bin/activate
```

3. **Install dependencies**
```bash
pip install django djangorestframework django-cors-headers Pillow
```

4. **Run migrations**
```bash
python manage.py makemigrations
python manage.py migrate
```

5. **Create superuser**
```bash
python manage.py createsuperuser
```

6. **Run development server**
```bash
python manage.py runserver
```

## Usage Examples

### 1. User Registration
```bash
curl -X POST http://localhost:8000/api/auth/register/ \
  -H "Content-Type: application/json" \
  -d '{
    "username": "testuser",
    "email": "test@example.com",
    "first_name": "Test",
    "last_name": "User",
    "password": "testpassword123",
    "password_confirm": "testpassword123"
  }'
```

### 2. User Login
```bash
curl -X POST http://localhost:8000/api/auth/login/ \
  -H "Content-Type: application/json" \
  -d '{
    "username": "testuser",
    "password": "testpassword123"
  }'
```

### 3. Create Chat Room
```bash
curl -X POST http://localhost:8000/api/chat-rooms/ \
  -H "Content-Type: application/json" \
  -H "Authorization: Token YOUR_TOKEN_HERE" \
  -d '{
    "subject": "Technical Support",
    "description": "Need help with my account",
    "priority": "medium"
  }'
```

### 4. Send Message
```bash
curl -X POST http://localhost:8000/api/messages/ \
  -H "Content-Type: application/json" \
  -H "Authorization: Token YOUR_TOKEN_HERE" \
  -d '{
    "chat_room_id": "ROOM_UUID_HERE",
    "content": "Hello, I need help with my account",
    "message_type": "text"
  }'
```

### 5. Assign Agent (Admin only)
```bash
curl -X POST http://localhost:8000/api/chat-rooms/ROOM_UUID_HERE/assign_agent/ \
  -H "Content-Type: application/json" \
  -H "Authorization: Token YOUR_TOKEN_HERE" \
  -d '{
    "agent_id": 1
  }'
```

## Admin Interface

Access the Django admin interface at `http://localhost:8000/admin/` to:

- Manage users and agents
- View all chat rooms and messages
- Monitor system activity
- Configure agent settings
- View notifications

## Models Overview

### ChatUser
- Extended user profile for chat functionality
- Tracks online status and last seen
- Stores phone number and avatar

### Agent
- Customer support representatives
- Manages availability and concurrent chats
- Tracks performance metrics

### ChatRoom
- Conversation containers
- Status management (waiting, active, resolved, closed)
- Priority levels and tagging

### Message
- Individual chat messages
- Support for text, images, and files
- Read status and edit tracking

### ChatSession
- Active session management
- Real-time connection tracking

### ChatNotification
- System notifications
- Event-based alerts

## Configuration

### Settings
- **CORS**: Configured for frontend integration
- **Authentication**: Token-based with session fallback
- **Pagination**: 20 items per page
- **File Uploads**: Supports avatars and attachments

### Environment Variables
Create a `.env` file for production settings:
```
SECRET_KEY=your-secret-key
DEBUG=False
ALLOWED_HOSTS=your-domain.com
DATABASE_URL=postgresql://user:pass@localhost/dbname
```

## Frontend Integration

The API is designed to work with modern frontend frameworks:

- **React/Vue/Angular**: Use axios or fetch for API calls
- **WebSocket**: Implement real-time updates (WebSocket support can be added)
- **Authentication**: Store tokens in localStorage or cookies
- **File Upload**: Use FormData for attachments

## Security Features

- Token-based authentication
- Permission-based access control
- CSRF protection
- Input validation
- File upload restrictions

## Performance Considerations

- Database indexing on frequently queried fields
- Pagination for large datasets
- Efficient queryset filtering
- Caching support (can be added)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support and questions, please contact the development team or create an issue in the repository.
