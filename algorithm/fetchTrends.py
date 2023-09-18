from pytrends.request import TrendReq
import json

def get_trending_queries(keyword):
    pytrends = TrendReq(hl='en-US', tz=360)
    pytrends.build_payload([keyword], cat=0, timeframe='today 5-y', geo='', gprop='')

    trending_queries_df = pytrends.related_queries()
    trending_queries = trending_queries_df[keyword]['top'].head(10)

    return trending_queries.to_json()

if __name__ == "__main__":
    results = get_trending_queries('reddit computer science')
    print(results)
