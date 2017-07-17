from flask import Flask, request
from flask_restful import Resource, Api
from flask_cors import CORS
from utilities.json_utilities import JsonUtilities
from termcolor import colored
import os, json

app = Flask(__name__)
CORS(app)
api = Api(app)

j_u = JsonUtilities()

class GetMetadata(Resource):
    def __init__(self):
        self.path_to_metadata = '../metadata'
        self.json_files = []
        self.json_files_names = []

        for json_file in os.listdir(self.path_to_metadata):
            self.json_files.append(json_file)
            self.json_files_names.append(j_u.clean_name(json_file))


    def ckeck_instance_metadata_status(self, instance):
        file_path = os.path.join(self.path_to_metadata, "metadata_" + instance + ".json")
        return os.path.isfile(file_path)


    def get_instance_metadata(self, instance):
        with open(os.path.join(self.path_to_metadata, "metadata_" + instance + ".json")) as data:
            return json.load(data)


    def get(self, param):
        if param == "names":
            obj = {
                "_result": "OK",
                "data": self.json_files_names
            }
            return obj

        elif self.ckeck_instance_metadata_status(param):
            obj = {
                "_result": "OK",
                "data": self.get_instance_metadata(param)
            }
            return obj

        else:
            obj = {
                "_result": "failed fetching data"
            }
            return obj


api.add_resource(GetMetadata, '/<string:param>')

if __name__ == '__main__':
    app.run(debug = True)
