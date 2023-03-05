from d3blocks import D3Blocks
from flask import Flask
import numpy as np
import csv
import pandas as pd
from sklearn.neighbors import LocalOutlierFactor



# Set flask name, this is standard
app = Flask(__name__)
# Initialize
d3 = D3Blocks()

# Import example
df = d3.import_example('energy')

# Show the input data
print(df)
#                      source            target   weight
# 0      Agricultural 'waste'    Bio-conversion  124.729
# 1            Bio-conversion            Liquid    0.597
# 2            Bio-conversion            Losses   26.862
# 3            Bio-conversion             Solid  280.322
# 4            Bio-conversion               Gas   81.144
# ..                      ...               ...      ...
# 63       Thermal generation  District heating   79.329
# 64                    Tidal  Electricity grid    9.452
# 65  UK land based bioenergy    Bio-conversion  182.010
# 66                     Wave  Electricity grid   19.013
# 67                     Wind  Electricity grid  289.366

# [68 rows x 3 columns]


# Initialize Network chart but do not yet show the chart.
d3.d3graph(df, showfig=False)

# Color node on clustering
d3.D3graph.set_node_properties(color='cluster')

# Make adjustments to the node: Thermal_generation
d3.D3graph.node_properties['Thermal_generation']['size']=20
d3.D3graph.node_properties['Thermal_generation']['edge_color']='#000fff' # Blue node edge
d3.D3graph.node_properties['Thermal_generation']['edge_size']=3 # Node-edge Size

# Make adjustments to the edge: 'Solar', 'Solar_Thermal'
d3.D3graph.edge_properties['Solar', 'Solar_Thermal']['color']='#000fff'
d3.D3graph.edge_properties['Solar', 'Solar_Thermal']['weight_scaled']=10

# Show the network graph
d3.D3graph.show()