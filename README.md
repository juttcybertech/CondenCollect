# CondenCollect  
By Jutt Cyber Tech

A powerful phishing simulation toolkit designed for cybersecurity training, awareness programs, and controlled lab environments.

## Screenshot

![CondenCollect Terminal](screenshort/pic.png)

## Overview

CondenCollect is a Python based phishing simulation server that helps cybersecurity learners understand how phishing attacks collect information. It hosts realistic phishing templates and captures detailed device and network information when someone opens the page. If credentials are entered, they are also logged.

All captured data is displayed in a clean, color enhanced terminal output and saved in organized text files.  
This tool is strictly for educational use inside a legal and controlled environment.

## Features

### Interactive Menu  
A clean and easy to navigate command line interface.

### Two Stage Information Collection

Stage One – When the visitor opens the link  
• Operating system  
• CPU, RAM, GPU  
• Screen resolution  
• Battery information  
• IP address  
• Country, city, region  
• Latitude and longitude  
• Internet service provider  

Stage Two – When the visitor submits credentials  
• Captures email and password entered in the phishing form.

### Organized Logging  
Automatically creates a Data folder and stores each client’s information in files such as:  
Client 1.txt  
Client 2.txt  
Client 3.txt

### Realistic Template  
Includes a professional TikTok themed phishing page.

## Installation

Run these commands:

git clone https://github.com/juttcybertech/CondenCollect
cd CondenCollect
pip install -r requirements.txt

## Usage

Start the server:

python app.py

A menu will appear. Choose a phishing template such as TikTok.  
The server will show a link for example:

Serving on: http colon slash slash 127.0.0.1 colon 8000

Send this link to your test target inside your cybersecurity lab.  
When they open the link, device and network information will instantly appear in your terminal and will also be saved in the Data folder.

If they enter credentials, those will also be displayed and logged.

## Disclaimer

This tool is created for education, awareness, and ethical cybersecurity testing only.  
The developer Jutt Cyber Tech is not responsible for any misuse.  
You are fully responsible for your actions.

