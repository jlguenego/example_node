# Instructions

1) Install Elasticsearch like indicated on the doc.
2) Start it. (localhost:9200 by default)
3) Install Kibana. Start it. (http://localhost:5601 by default)
4) Install Redis (port for windows) version >=3.2
5) Run the `build-csv.js` script.
6) Run the `load-elastic-bulk.js` node script. It will try to connect and create the 'hello' index inside the ElasticSearch database.
7) Run the `load-redis.js` node script.



