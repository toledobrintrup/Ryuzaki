#!/usr/bin/env python3
import http.server, socketserver, functools

DIRECTORY = "/Users/gabrieltoledobrintrup/Documents/GitHub/Ryuzaki/preview"
PORT = 4321

Handler = functools.partial(http.server.SimpleHTTPRequestHandler, directory=DIRECTORY)

class Server(socketserver.TCPServer):
    allow_reuse_address = True

with Server(("127.0.0.1", PORT), Handler) as httpd:
    print(f"Ryuzaki preview en http://127.0.0.1:{PORT}")
    httpd.serve_forever()
