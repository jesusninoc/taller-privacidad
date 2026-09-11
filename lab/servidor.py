from http.server import HTTPServer, SimpleHTTPRequestHandler
import json
import datetime

class PrivacyHandler(SimpleHTTPRequestHandler):
    def do_GET(self):
        # Captura de la hora actual
        now = datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        
        print("
" + "="*60)
        print(f"[{now}] [PETICIÓN RECIBIDA]")
        print(f"Cliente IP   : {self.client_address[0]}")
        print(f"Puerto       : {self.client_address[1]}")
        print(f"Método HTTP  : {self.command}")
        print(f"Ruta         : {self.path}")
        print("-" * 60)
        print("CABECERAS ENVIADAS AUTOMÁTICAMENTE POR EL CLIENTE:")
        
        for header, value in self.headers.items():
            print(f"  > {header}: {value}")
            
        print("="*60 + "
")
        
        # Servir archivos estáticos del directorio
        super().do_GET()

def run(server_class=HTTPServer, handler_class=PrivacyHandler, port=8000):
    server_address = ('', port)
    httpd = server_class(server_address, handler_class)
    print(f"🚀 Servidor escuchando en http://localhost:{port}")
    print("Presiona Ctrl+C para detener el servidor.
")
    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        print("
Servidor detenido correctamente.")

if __name__ == "__main__":
    run()
