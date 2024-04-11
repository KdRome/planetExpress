#!/bin/bash

# Checking for npm
if ! command -v npm &> /dev/null
then
  echo "npm could not be found, installing Node.js and npm"
  sudo apt-get install npm -y
  sudo apt-get install nodejs -y
fi

# Check for pip
if ! command -v pip &> /dev/null
then
  echo "pip could not be found, installing Python3 and pip."
  sudo apt-get install python3 -y
  sudo apt-get install python3.11-venv -y
fi 

cd client

# Install npm packages
echo "Installing npm packages..."
npm install axios dotenv react react-dom react-router-dom

cd ..

# Python virt_env
echo "Activating virtual environment..."
cd server/
python3 -m venv virt_env
source virt_env/bin/activate 

# Install pip packages
echo "Installing pip packages..."
pip install -r "/path/to/requirements.txt" # Make sure to change this before running

echo "Deactivating virtual environment..."
deactivate

txtgreen='\e[0;32m'
echo -e "${txtgreen}Installation complete."

txtred='\e[0;31m'
echo -e "${txtred}To Run the FRONTEND:"     

txtreset='\e[0m'
echo -e "${txtgreen}cd client/
npm run dev${txtreset}"