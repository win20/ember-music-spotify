import json

def handler(event, context):
    song_to_crawl_url = event['queryStringParameters']['url']

    return {
        'statusCode': 200,
        'headers': {'Content-Type': 'application/json'},
        'body': song_to_crawl_url,
    }

