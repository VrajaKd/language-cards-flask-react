# Language learning cards

Technologies and libraries used: SQLAlchemy, MySQL, Flask, React

![Language App](/language_app.jpg?raw=true)

## How to set up

**Preparation**
- Install pip
- Install virtualenv
- Activate virtual environment

Instructions:
https://packaging.python.org/guides/installing-using-pip-and-virtual-environments/

- Rename .env.dev to .env
- Configure the MySQL database in an .env file

In the **api** folder:
- Install the packages
    ```
    pip install -r requirements.txt
    ```

- Start Flask
    ```
    python routes.py
    ```
In the **client** folder:
- Install needed NPM packages
    ```
    npm install
    ```
- Start React in the client folder
    ```
    npm start
    ```
The answers are stored in the 'answers' table in the database.
