# Samamazon

Welcome to Samazon, the e-commerce platform engineered for tech enthusiasts. Inspired by the robustness of Amazon, Samazon takes online shopping to the next level by focusing on the unique needs of tech-savvy consumers. Leveraging cutting-edge technologies like Flask, SQLAlchemy, React, Redux, and AWS, we offer a seamless and intuitive interface for both buyers and sellers.

[LIVE LINK](https://samazon-cd39.onrender.com/)

![samazon-screenshot](https://github.com/samhandels/Samazon/assets/123411173/17889e08-9b0b-44ee-9255-a9f9aac5e426)

## Features
Products - Full Create, Read, Update and Delete functionality for a user with products. Able to utilize AWS and choose an image to display for each product.

Shopping Cart - Full CRUD functionality for Shopping cart, allowing users to add and delete products from the shopping cart and ability to change the quantity of the products you'd like to purchase. Cycle is completed with the checkout page and completing your purchase.

Search Bar Feature - Ability to search in the navigation for all the products by name, description and category of product and will return a filtered search of products matching the description in the search.

## Technologies Used

### Backend
![Python](https://img.shields.io/badge/Python-3776AB.svg?style=for-the-badge&logo=Python&logoColor=white)
![Flask](https://img.shields.io/badge/Flask-000000.svg?style=for-the-badge&logo=Flask&logoColor=white)
- SQLAlchemy

### Frontend
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E.svg?style=for-the-badge&logo=JavaScript&logoColor=black)
![React](https://img.shields.io/badge/React-61DAFB.svg?style=for-the-badge&logo=React&logoColor=black)
![Redux](https://img.shields.io/badge/Redux-764ABC.svg?style=for-the-badge&logo=Redux&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6.svg?style=for-the-badge&logo=CSS3&logoColor=white)
![HTML5](https://img.shields.io/badge/HTML5-E34F26.svg?style=for-the-badge&logo=HTML5&logoColor=white)

### Cloud Services
![Amazon AWS](https://img.shields.io/badge/Amazon%20AWS-232F3E.svg?style=for-the-badge&logo=Amazon-AWS&logoColor=white)

## Future goals/implementations
- Product Reviews - allows user to leave reviews on purchased products
- Order History - View your previously ordered products

## Set Up

- Clone the repo

### Back End Server

- Open up a new terminal

- Open up the project folder

- Install dependencies

  ```bash
  pipenv install -r requirements.txt
  ```

- Create a **.env** file based on the example

- Run the following commands to open your pipenv, migrate the database, seed the database, and run the Flask app

  ```bash
  pipenv shell
  ```

  ```bash
  flask db upgrade
  ```

  ```bash
  flask seed all
  ```

  ```bash
  flask run
  ```

### Front End

- Open up another new terminal

- Direct to the <code>react-app</code> folder

- Install dependencies

  ```bash
  npm install
  ```

- Start the React App

  ```bash
  npm start
  ```


## API Endpoints
| Method   | URL                                      | Description                              |
| -------- | ---------------------------------------- | ---------------------------------------- |
| `POST`    | `/api/auth/login`                        | Logs in user, Recieve body containing credential & password  |
| `POST`   | `/api/auth/signup`                        | Signs up user, Recieve body containing username, email, password & address  |
| `GET`    | `/api/auth/logout`                          | Logs out user |
| `GET`  | `/api/users`                          | Fetches all users |
| `GET`   | `/api/users/:userId`                 | Fetches single user |
| `GET`   | `/api/products?=`                 | Fetches all products, takes optional query string |
| `GET`   | `/api/products/:productId`                 | Fetches single product  |
| `POST`   | `/api/products/new`                 | Creates new product   |
| `PUT`   | `/api/products/:productId`                 | Updates product  |
| `DELETE`   | `/api/products/:productId`                 | Deletes product   |
| `GET`   | `/api/cart`     | Fetches user cart |
| `POST`   | `/api/products/:productId/cart`     | Adds product to user cart |
| `DELETE`   | `/api/carts/:productId`     | Removes product from cart |
| `PUT`   | `/api/carts`     | Updates quantity of product in cart |
