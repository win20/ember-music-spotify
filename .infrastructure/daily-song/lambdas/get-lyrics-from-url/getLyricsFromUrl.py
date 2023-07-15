import json
from bs4 import BeautifulSoup as bs
import requests

def handler(event, context):
    URL = event['queryStringParameters']['url']
    page = requests.get(URL)
    soup = bs(page.content, 'html.parser')
    lyrics = soup.find_all('a', {'class': 'ReferentFragmentdesktop__ClickTarget-sc-110r0d9-0'})

    lyric_lines = []
    for lyric in lyrics:
        lyric_lines.append(lyric.text)

    message = {
        'lyrics': lyric_lines
    }

    return {
        'statusCode': 200,
        'headers': {
            'Content-Type': 'application/json'
        },
        'body': json.dumps(message),
    }

