# API and Database
## Database
database name: customer_management

table name: customers
* **uid**: unique id 
* **name**: full name
* **email**: email address
* **password**: password

## API Endpoints
URL: http://localhost:3000
### Get the customers
* **GET** `/customers`

Example Response (200 OK)
``````
[
    {
        "uid": 1,
        "name": "Corene Doby",
        "email": "cdoby0@netlog.com",
        "password": "jB5%Wo+FQ"
    },
    {
        "uid": 2,
        "name": "Harri Borborough",
        "email": "hborborough1@squarespace.com",
        "password": "rP4&OlP>ftkpk"
    }
]
``````

### Get a customer
* **GET** `/customers/:id` 

Example Response (200 OK)
``````
[
    {
        "uid": 1,
        "name": "Corene Doby",
        "email": "cdoby0@netlog.com",
        "password": "jB5%Wo+FQ"
    }
]
``````

### Create a new customer
* **POST** `/customers`

Example Request
``````
{
	"name": "User One",
	"email": "user@email.com", 
	"password": "strongPassword"
}
``````

Example Response (201 Created)
``````
{
    "message": "New customer added with ID 19"
}
``````

### Update an existing customer
* **PUT** `/customers/:id`

Example Request
``````
{
	"name": "User One!",
	"email": "user_one@email.com", 
	"password": "betterPassword"
}
``````

Example Response (200 OK)
``````
{
    "message": "Customer with ID 19 updated successfully."
}
``````

### Delete an existing customer
* **DELETE** `/customers/:id`

Example Response (200 OK)
``````
{
    "message": "Customer with ID 19 updated successfully."
}
``````
