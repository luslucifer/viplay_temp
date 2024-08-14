import base64
from Crypto.Cipher import AES
from Crypto.Util.Padding import unpad
from Crypto.Random import get_random_bytes
import requests

async def decrypt_content(cipher_text_b64):
    key = base64.b64decode("vPl@yS3cureV1de0EnceyptionK3y201")
    cipher_text = base64.b64decode(cipher_text_b64)

    iv = cipher_text[:16]
    encrypted_data = cipher_text[16:]

    try:
        cipher = AES.new(key, AES.MODE_CBC, iv)
        decrypted_data = unpad(cipher.decrypt(encrypted_data), AES.block_size)
        return decrypted_data.decode('utf-8')
    except (ValueError, KeyError) as e:
        print(f"Decryption error: {e}")
        raise

async def fetch_and_process_m3u8(url):
    import requests
    from bs4 import BeautifulSoup
    from urllib.parse import urljoin

    try:
        response = requests.get(url,headers={'Referer':url})
        response.raise_for_status()
        content = response.text
        decrypted_content = await decrypt_content(content)

        base_url = urljoin(url, "/".join(url.split("/")[:-1]) + "/")
        lines = decrypted_content.split("\n")
        playlists = []
        tasks = []

        for line in lines:
            if line.startswith("#EXT-X-STREAM-INF:"):
                # Extract playlist URL
                playlist_url = urljoin(base_url, lines[i + 1])
                tasks.append(fetch_playlist(playlist_url, i))
            elif line.startswith("#EXT-X-STREAM-INF:"):
                # Do something if needed
                pass

        playlist_results = await asyncio.gather(*tasks)
        return playlist_results

    except Exception as e:
        print(f"Error processing m3u8: {e}")
        raise

async def fetch_playlist(playlist_url, index):
    try:
        response = requests.get(playlist_url)
        response.raise_for_status()
        playlist_content = response.text
        decrypted_playlist = await decrypt_content(playlist_content)
        
        return {
            "index": index,
            "url": playlist_url,
            "content": decrypted_playlist
        }
    except Exception as e:
        print(f"Error fetching playlist: {e}")
        return None

def str2ab(string):
    return bytes(string, 'utf-8')

async def run():
    url = "https://vplay.su/secure/81362965c6a47d7/1080/1080p.txt"
    playlists = await fetch_and_process_m3u8(url)
    print(playlists)

if __name__ == "__main__":
    import asyncio
    asyncio.run(run())
