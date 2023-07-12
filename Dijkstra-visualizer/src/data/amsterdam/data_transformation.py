import csv
import json

graph = {}

with open('nodes.csv', 'r') as nodes_file:
    nodes_reader = csv.DictReader(nodes_file, delimiter=',')
    for node_row in nodes_reader:
        node_id = node_row['id']
        lon = float(node_row['lon'])
        lat = float(node_row['lat'])
        graph[node_id] = {
            'latitude': lat,
            'longitude': lon,
            'adjacent_nodes': []
        }

with open('edges.csv', 'r') as edges_file:
    edges_reader = csv.DictReader(edges_file, delimiter=',')
    for edge_row in edges_reader:
        source_node = edge_row['source']
        target_node = edge_row['target']
        
        graph[source_node]['adjacent_nodes'].append(int(target_node))

with open('graph.json', 'w') as json_file:
    json.dump(graph, json_file, indent=4)

    