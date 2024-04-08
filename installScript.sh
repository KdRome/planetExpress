#!/bin/bash

# Checking for npm
if ! command -v npm &> /dev/null
then
  echo "npm could not be found, installing Node.js and npm"
  sudo apt-get install nodejs -y
fi

# Check for pip
if ! command -v pip &> /dev/null
then
  echo "pip could not be found, installing Python and pip."
  sudo apt-get install python3 -y
fi 

cd client

# Install npm packages
echo "Installing npm packages..."
npm install axios dotenv react react-dom react-router-dom

cd ..

# Installing flask-bcrypt
echo "Installing "

# Python virt_env
echo "Activating virtual environment..."
cd server/
python3 -m venv virt_env
source virt_env/bin/activate 

# Install pip packages
echo "Installing pip packages..."
pip install flask flask-bcrypt flask-cors flask-sqlalchemy psycopg2-binary python-dotenv flask-mail

echo "Deactivating virtual environment..."
deactivate

txtgrn='\e[0;32m'
echo -e "${txtgrn}Installation complete."

txtred='\e[0;31m'
echo -e "${txtred}To Run the FRONTEND:"     

echo -e "${txtgrn}cd client/
npm run dev"
