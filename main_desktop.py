import os
import sys
import threading
import http.server
import socketserver
import webview

PORT = 8998
DIRECTORY = os.path.dirname(os.path.abspath(__file__))

class Handler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIRECTORY, **kwargs)

def start_server():
    with socketserver.TCPServer(("127.0.0.1", PORT), Handler) as httpd:
        httpd.serve_forever()

if __name__ == '__main__':
    # Start background local HTTP server
    server_thread = threading.Thread(target=start_server, daemon=True)
    server_thread.start()

    # Launch native desktop application window
    window = webview.create_window(
        title="Rèn Luyện Trí Nhớ & Tính Toán Nhẩm",
        url=f"http://127.0.0.1:{PORT}",
        width=480,
        height=850,
        resizable=True,
        min_size=(360, 600)
    )
    webview.start()
