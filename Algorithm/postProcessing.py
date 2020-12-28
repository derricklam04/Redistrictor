import json

from shapely.geometry import Polygon, mapping
from shapely.ops import cascaded_union

#####################################################################

geoFile = 'GA_refined.json'
resultsFile = 'summary2.json'
precinctData = None

def getCoordinates(precinctID):
    # GEO COORD is stored in features(list) --> properties(dict) --> geometry(dict) --> coordinates(list)
    properties = precinctData[precinctID]
    geometry = properties["geometry"]
    type = geometry["type"]
    coordinates = geometry["coordinates"]
    result = []
    if type == "MultiPolygon":  # 3 deep
        for multi in coordinates:
            for poly in multi:
                result.extend([tuple(c) for c in poly])

    elif type == "Polygon": # 2 deep
        for polygon in coordinates:
            result.extend([tuple(c) for c in polygon])

    return result


if __name__ == '__main__':
    open('postProcessed2.txt', 'w').close()

    # READ JSON
    geoData = ''
    with open(geoFile, "r") as read_file:
        geoData = json.load(read_file)
    precinctData = geoData["features"]

    # Read results
    resultsData = ''
    with open(resultsFile, "r") as read_file:
        resultsData = json.load(read_file)
    plans = resultsData["districtingPlans"]
    for i, plan in enumerate(plans[1:]):
        districts = plan["districts"]
        print("-- PLAN --")
        for index, district in enumerate(districts,start=1):
            print("District: ", index)
            polygons = []
            for precinct in district:
                coords = getCoordinates(precinct)
                #print(coords)
                polygon = Polygon([c for c in coords])
                polygons.append(polygon)

            new_geometry = mapping(cascaded_union(polygons))
            dict = {"districtNumber": index, "geometry": new_geometry}

            with open("postProcessed2.txt", 'a') as f:
                 json.dump(dict, f, indent=3)
        break