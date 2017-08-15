# python_ckan
Aplicación desarrollada en python para la obtención de datasets libres bajo el uso del api de ckan

## Aplicación de consumo de datos
### Librerías necesarias para ejecutar la obtención de datos:
1. json (Libreria para la manipulación de archivos json)
2. time (Libreria para mediciones de tiempo de ejecución del programa)
3. ckanapi (Api de ckan para el consumo de datasets)
```
pip install ckanapi
```
4. termcolor
```
pip install termcolor
```

### Ejecución:
Para ejecutar la aplicación para el consumo de datasets.

**En el directorio raíz correr el archivo main.py.**
```
python main.py
```

## Servicio API-REST en FLASK
### Librerías necesarias para ejecutar el servicio:
1. flask (Microframework para el montaje del servicio)
```
pip install Flask
```
2. flask_restful (Extención de Flask para implementar un servicio rest)
```
pip install flask-restful
```
3. flask_cors (Extencion de Flask para permitir CORS para el servicio)
```
pip install flask-cors
```

### Ejecución:
Para la ejecución del servicio rest para el consumo local de datasets.

**En el directorio flask_data_server correr el archivo app.py.**
```
python app.py
```

## Aplicación de analytics
### Librerías necesarias para la ejecución de la aplicación
Para la instalación de las dependencias para la ejecución de la aplicacón
hay que ingresar al directorio **AnalyticsWebApp** y ejecutar el comando
```
npm install
```
El cual instalara todas las dependencias listadas en el archívo package.json

Ademas se es necesario tener angular instalado en la maquina donde se ejecutara la aplicación
de la siguiente manera:
```
npm install -g @angular/cli
```

**Tener en cuenta que para la ejecución correcta de la aplicación hay que tener instalado nodejs version 8 o superior**
 
### Ejecucion
Para ejecutar el programa de analytics se necesita tener instalado angular,
posicionado en el directorio **AnalyticsWebApp** y ejecutar el siguiente comando para ejecutar el servicio en el buscador
```
ng serve
```
una vez ejecutado el comando para iniciar el servidor, en el buscador se puede escribir la siguiente
dirección para acceder a la aplicación web
```
http://localhost:4200
```
