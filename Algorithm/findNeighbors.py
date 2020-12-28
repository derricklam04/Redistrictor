import geopandas as gp

file= "ELECTION_PRECINCTS/ELECTION_PRECINCTS.shp"

df = gp.read_file(file) # open file
df["NEIGHBORS"] = None  # add NEIGHBORS column

print("Index    PrecinctID      Neighbors")
print("======================================================================================================")
for index, precinct in df.iterrows():
    neighbors = df[df.geometry.touches(precinct['geometry'])].OBJECTID.tolist()
    try:
        neighbors = neighbors.remove(precinct.OBJECTID)
    except ValueError:
       pass
    neighborstring = list(map(str, neighbors))
    df.at[index, "NEIGHBORS"] = ", ".join(neighborstring)

    print('{:<9}{:<15}'.format(index, precinct.OBJECTID), neighborstring)

# save GeoDataFrame as a new file
#df.to_file("newfile.txt")