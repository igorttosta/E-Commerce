import json
import pandas as pd
import sys

fileName = sys.argv[1]

base = pd.read_csv(r'C:\Users\matos\OneDrive\Área de Trabalho\Projeto BeABa\Projeto BeABa - back\uploads\{}'.format(fileName), encoding='latin-1', sep=';', decimal=',')

product_ids = []
for x in base.values:
    product_ids.append(x[0])

print(product_ids)