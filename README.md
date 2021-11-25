# Language learning cards

Technologies and libraries used: SQLAlchemy, MySQL, Flask, React

## How to set up

**Preparation**
- Install pip
- Install virtualenv
- Activate virtual environment

Instructions:
https://packaging.python.org/guides/installing-using-pip-and-virtual-environments/

- Install the packages in the api folder
    ```
    pip install -r requirements.txt
    ```
- Configure the MySQL database in an .env.dev file
- Start Flask in the api folder
    ```
    python router.py
    ```
- Start React in the client folder
    ```
    npm start
    ```
The answers are stored in the 'answers' table in the database.