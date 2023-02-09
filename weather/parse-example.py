
pip3 install xmltodict

import xmltodict
import pprint
import json


def file_write(path, str_to_write):
    f = open(path, "w")
    f.write(str_to_write)
    f.close()



def start():
    pass
    with open('weather.xml') as fd:
        doc = xmltodict.parse(fd.read())
    print(doc)
    print(type(doc))

    pp = pprint.PrettyPrinter(indent=4)
    x = (json.dumps(doc))
    print(type(x))

    print(x)
    file_write("data.json", x)






if __name__ == "__main__":
    start()
