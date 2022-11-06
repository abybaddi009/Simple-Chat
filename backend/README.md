# Chat - Backend app

This project was bootstrapped with Django.

For the sake of demo, sqliteDB has been used. In production PostgreSQL, Microsoft SQL Server, Oracle DB, etc. can be used.

## Pre-requisites

### `python3 -m venv .env`

Create a virtual environment with 

### `pip3 install -r requirements.txt`

Install all the requirements with 

## Running the project

In the project src directory, you can run:

Runs the local server on port 8000

### `python manage.py makemigrations`

Runs the script to create migrations

### `python manage.py migrate`

Runs the script to apply the migrations to the DB

### `python manage.py runserver`

Runs the app in the development mode.\
Open [http://localhost:8000](http://localhost:8000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

## Author
- [Abhishek Baddi](https://github.com/abybaddi009)
