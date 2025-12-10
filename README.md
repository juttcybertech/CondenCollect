# CondenCollect

A sophisticated phishing simulation toolkit designed for educational and security awareness purposes.

![Terminal Screenshot](https://i.imgur.com/your-screenshot-url.png)  <!-- You can replace this with a real screenshot URL -->

## Overview

CondenCollect is a Python-based web server that hosts phishing templates to simulate real-world attacks. It captures detailed information from any visitor who opens the link and logs their credentials upon submission. The tool features a clean, interactive command-line interface and saves all captured data in organized text files for later analysis.

## Features

*   **Interactive CLI**: A colorful and user-friendly command-line menu to manage the tool.
*   **Detailed Information Gathering**: Captures a wide range of data in two stages:
    *   **Stage 1 (On Visit)**: Gathers Device Information (OS, CPU, RAM, GPU, Resolution, Battery) and Network Details (IP, Geolocation, ISP).
    *   **Stage 2 (On Submission)**: Captures user-entered credentials (email and password).
*   **Organized Logging**: Automatically creates a `Data/` directory and saves a detailed report for each client in a separate file (e.g., `Client 1.txt`, `Client 2.txt`).
*   **Professional Output**: Presents captured data in a beautifully formatted and color-coded layout in the terminal for easy reading.
*   **Modular & Extensible**: Built with a clean structure that makes it easy to add new phishing templates.
*   **Realistic Template**: Includes a high-quality, responsive TikTok phishing page.

## Screenshot

A preview of the terminal output when a new visitor is detected. The tool provides detailed device and network information in a clean, formatted table.

## Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/Juttstodio/CondenCollect.git
    ```

2.  **Navigate to the project directory:**
    ```bash
    cd CondenCollect
    ```

3.  **Install the required dependencies:**
    ```bash
    pip install -r requirements.txt
    ```

## Usage

1.  **Run the server:**
    ```bash
    python app.py
    ```

2.  The tool will start and display a banner, followed by a menu.

3.  **Select an attack method** by entering the corresponding number (e.g., `1` for TikTok).

4.  The server will start and provide a URL (e.g., `Serving on: http://127.0.0.1:8000`).

5.  Send this link to your target. When they open it, their device and network information will be displayed in your terminal and saved to a file in the `Data/` directory.

6.  If the target enters their credentials, they will also be displayed in the terminal and appended to the same client file.

## Project Structure

## Disclaimer

This software is distributed under the Jutt Studio Attribution License (JSAL) 1.0. See the [LICENSE](LICENSE) file for full details.

This tool is intended for **educational and security awareness purposes only**. The developer, Jutt Studio, is not responsible for any misuse or damage caused by this program. Using this tool for any malicious or illegal activity is strictly prohibited. **You are solely responsible for your actions.**

---

**Developed by Jutt Studio (JS)**
*Email: js434@proton.me*
