# Samamazon

Welcome to Samazon, the e-commerce platform engineered for tech enthusiasts. Inspired by the robustness of Amazon, Samazon takes online shopping to the next level by focusing on the unique needs of tech-savvy consumers. Leveraging cutting-edge technologies like Flask, SQLAlchemy, React, Redux, and AWS, we offer a seamless and intuitive interface for both buyers and sellers.

[LIVE LINK](https://samazon-cd39.onrender.com/)

![samazon-screenshot](https://github.com/samhandels/Samazon/assets/123411173/17889e08-9b0b-44ee-9255-a9f9aac5e426)

## Features
Products - Samazon offers users a robust set of features for managing products. It utilizes Python and Flask for the backend, providing a secure and efficient foundation for handling product data. To enhance the user experience, AWS services are integrated for seamless image uploads. This not only adds visual appeal but also ensures that product images are stored and delivered reliably. SQLAlchemy, a powerful ORM (Object-Relational Mapping) tool, is employed to optimize database operations. This ensures data integrity, efficient querying, and streamlined data management. React's component-based architecture and hooks like useState and useEffect enable the creation of dynamic and responsive user interfaces. Users can easily create, update, and delete product listings.

Shopping Cart - The shopping cart functionality in Samazon is designed with full CRUD capabilities, allowing users to easily add, delete, and modify products within their cart. This provides a seamless and flexible shopping experience. Users can adjust the quantity of products they wish to purchase, ensuring a tailored shopping experience that meets their needs. The shopping journey is completed with a dedicated checkout page, streamlining the purchase process and enhancing user convenience.

Search Bar Feature - Samazon's navigation includes a powerful search bar feature that enables users to quickly find products based on name, description, and category. The search results are intelligently filtered to match the user's query.

<img width="1510" alt="shopping-cart-samazon" src="https://github.com/samhandels/Samazon/assets/123411173/2a2b91e8-09aa-43cc-8482-f92e088c6a44">


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
