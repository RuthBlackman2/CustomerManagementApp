# Customer Management Application
A React app for managing customers!

Features:
* View name, email, and password for each customer
* Sort the table of customers depending on the column  (e.g. ascending id)
* Filter the table of customers (e.g. search for a specific name)
* Add a new customer
* Edit the name, email, or password for an existing customer
* Delete an existing customer
* Backend integrated with frontend to fetch and query customers from a PostgreSQL database

Tech stack:
* Frontend: React + Vite
* Backend: Express.js
* Database: PostgreSQL

## Setup Database
### Install PostgreSQL
* Install PostgreSQL from their [website](https://www.postgresql.org/download/). When installing it, make sure you note the username, password, and port number as these will need to be used in the backend (server.js).
* Open up psql (Windows users can search for SQL Shell (psql) in their applications and use this)
* Press enter for Server [localhost]
* Press enter for Database [postgres]
* Press enter for Port [5432]
* Enter in your password
* You should now be in psql, where you will be able to setup the database and table

### Setup the database and table
* Create a database called **customer_management**: `CREATE DATABASE customer_management;`
* Connect to the database: `\c customer_management`
* Create a table called **customers**: `CREATE TABLE customers (uid SERIAL PRIMARY KEY NOT NULL, name VARCHAR NOT NULL, email VARCHAR NOT NULL, password VARCHAR NOT NULL);`
* Verify that the table has been created: `\dt`
* The command below consists of **fake data** generated by [mockaroo.com](https://www.mockaroo.com/). Copy and paste it into your terminal in order to insert some customers into the table.

~~~~
INSERT INTO public.customers (name, email, password) VALUES
('Corene Doby', 'cdoby0@netlog.com', 'jB5%Wo+FQ'),
('Harri Borborough', 'hborborough1@squarespace.com', 'rP4&OlP>ftkpk'),
('Zach Garlette', 'zgarlette2@123-reg.co.uk', 'tT3"8QBING'),
('Chiarra Keetch', 'ckeetch3@csmonitor.com', 'kR7=0cHy7xu%v}'),
('Jory Sehorsch', 'jsehorsch4@1688.com', 'lX5|50fBVNbUyL'),
('Lida Brecknell', 'lbrecknell5@theglobeandmail.com', 'fH1=o/d<|O5'),
('Gertrude Wills', 'gwills6@sina.com.cn', 'fG3/tG|Te.D{4z#0'),
('Dennison Gleeson', 'dgleeson7@bravesites.com', 'dM5"!(VI'),
('Eb Spowart', 'espowart@mozilla.com', 'eG8!I3/d{,n2'),
('Maury Kareman', 'mkareman9@irs.gov', 'nS7#*R/~B+m}'),
('Haily Matonin', 'hmatonina@wp.com', 'oU5".s,|<!fZUXOI');
~~~~
* Verify that the customers table has these newly added customers: `SELECT * FROM public.customers;`
* The database is now ready to go!


## Setup Frontend
* cd into *front-end-app*
* create an .env file (just within front-end-app directory) and ensure it looks like this
~~~~
VITE_CUSTOMERS_API_URL='http://localhost:3000/customers'
~~~~
* install npm dependencies: `npm install`
* start the server: `npm run dev`
* navigate to [localhost:5173](http://localhost:5173/)

## Setup Backend
* cd into *back-end-rest-server*
* create an .env file (just within back-end-rest-server directory) and ensure it looks like this 
* **change POSTGRES_USER, POSTGRES_PWD, and POSTGRES_PORT depending on how you setup PostgreSQL**

~~~~
POSTGRES_USER=''
POSTGRES_HOST='localhost'
POSTGRES_DB='customer_management'
POSTGRES_PWD=''
POSTGRES_PORT=5432
~~~~

* install npm dependencies: `npm install`
* start the server: `npm run start`
* check console to see that server is running
* verify that the db is connected properly by navigating to [localhost:3000/customers](http://localhost:3000/customers). You should see the data that you inserted. 

## Run Tests
* Make sure the server is running in *back-end-rest-server*
* cd to *front-end-app*
* run `npm run test`