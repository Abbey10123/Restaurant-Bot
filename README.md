Restaurant Chatbot
A restaurant chatbot built using Node.js, Express, and Redis, enabling users to place orders, view menus, check order history, and track the current order with simple text-based commands.

Features
View Menu: Retrieve a list of menu items with prices.

Place Order: Select menu items and specify quantities to place an order.

Order History: Retrieve the list of past orders associated with a session.

Current Order: Check the status of an ongoing order.

Order Cancellation: Cancel an ongoing order.

Session Management: Each user interaction is tracked by a session ID, ensuring consistency.

Technologies
Node.js: Backend server for handling API requests and background jobs.

Express: Web framework to handle routing.

Bull: A queue system for managing background jobs like fetching the order history or processing user requests.

MongoDB: Database for storing orders, menu items, and user data.

Redis: Cache system for storing temporary data like menus and order status.

UUID: Used for generating unique session IDs for each user.

Redis Configuration
The application uses Redis for caching responses and managing background jobs.

MongoDB is used to store menu data and orders. 

Background Worker Queue (Bull)
The app uses Bull for managing background tasks like retrieving the order history or fetching menus. The worker listens for jobs in a Redis queue and processes them asynchronously. 
