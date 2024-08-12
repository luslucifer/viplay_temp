from flask import Flask, request, Response
import requests
from base64 import b64decode
from cryptography.hazmat.primitives.ciphers import Cipher, algorithms, modes
from cryptography.hazmat.backends import default_backend

app = Flask(__name__)
port = 3030

# Decryption function
def decrypt_content(T):
    try:
        # Prepare the key and IV
        key = b"vPl@yS3cureV1de0EnceyptionK3y201"
        decoded = b64decode(T)
        iv = decoded[:16]
        encrypted_data = decoded[16:]

        # Decrypt the content using AES-CBC
        cipher = Cipher(algorithms.AES(key), modes.CBC(iv), backend=default_backend())
        decryptor = cipher.decryptor()
        decrypted_data = decryptor.update(encrypted_data) + decryptor.finalize()

        return decrypted_data.rstrip(b"\x00").decode('utf-8')
    except Exception as e:
        print(f"Decryption error: {e}")
        raise e

# Simple GET route
@app.route('/<id>/file.m3u8')
def handle_m3u8(id):
    host = request.host
    protocol = request.scheme
    origin = f"{protocol}://{host}"
    url = f"https://vplay.su/secure/{id}/1080/1080p.txt"

    try:
        response = requests.get(url, headers={'Referer': url})
        encoded = response.text
        decoded = decrypt_content(encoded)

        lines = decoded.split('\n')
        processed_lines = []

        for line in lines:
            if line.strip().startswith('http'):
                line = f"{origin}/proxy/{requests.utils.quote(line).replace('.m3u8', '.ts')}"
            processed_lines.append(line)

        return "\n".join(processed_lines)
    except Exception as e:
        return Response('Decryption or fetching failed.', status=500)

# Proxy route
@app.route('/proxy/<path:proxy>')
def handle_proxy(proxy):
    url = requests.utils.unquote(proxy)
    try:
        response = requests.get(url, headers={
            "Referer": 'https://vplay.su/',
            "Origin": 'https://vplay.su/'
        }, stream=True)

        content_type = response.headers.get('Content-Type', 'application/octet-stream')
        data = response.content

        return Response(data, content_type=content_type)
    except Exception as e:
        return Response('Proxy request failed.', status=500)

# Start the server
if __name__ == '__main__':
    app.run(host='0.0.0.0', port=port)
