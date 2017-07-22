from flask import Flask, request
from flask_restful import Resource, Api
from flask_cors import CORS
from utilities.json_utilities import JsonUtilities
import os, json

app = Flask(__name__)   # Creacion de aplicacion
CORS(app)               # Adicion de CORS para peticiones al api
api = Api(app)          # Instanciacion del api

j_u = JsonUtilities()   # Instanciacion de clase de utilidades json

class GetMetadata(Resource):
    # Inicializacion de datos
    def __init__(self):
        self.path_to_metadata = '../metadata'
        self.json_files = []
        self.json_files_names = []

        for json_file in os.listdir(self.path_to_metadata):
            self.json_files.append(json_file)
            self.json_files_names.append(j_u.clean_name(json_file))

    # Funcion para la comprobacion de estatus de metadata
    # en el repositorio local
    def ckeck_instance_metadata_status(self, instance):
        file_path = os.path.join(self.path_to_metadata, "metadata_" + instance + ".json")
        return os.path.isfile(file_path)

    # Funcion para la obtencion del archivo json para el api rest
    def get_instance_metadata(self, instance):
        with open(os.path.join(self.path_to_metadata, "metadata_" + instance + ".json")) as data:
            return json.load(data)

    # Funcion publica de acceso para el api rest
    def get(self, param):
        # Retorno de instancias
        if param == "names":
            obj = {
                "_result": "OK",
                "data": self.json_files_names
            }
            return obj

        # Retorno de metadata solicitado
        elif self.ckeck_instance_metadata_status(param):
            obj = {
                "_result": "OK",
                "data": self.get_instance_metadata(param)
            }
            return obj

        # Control para fallos
        else:
            obj = {
                "_result": "failed fetching data"
            }
            return obj

# Adicion del recurso mediante la url
api.add_resource(GetMetadata, '/<string:param>')

if __name__ == '__main__':
    app.run(debug = True)
