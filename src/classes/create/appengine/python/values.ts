
const mainvalue = `
import os 

from flask import Flask



app = Flask(os.getenv(key="INSTANCE_NAME",default="APP ENGINE PROJECT"))


@app.route('/')
def hello_world():
    return 'Hello, World!'

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=os.getenv(key="HOST_PORT",default=8080))
`;


const appYamlValue = `
# Python version (Ex: Python 3.9.0 = python390)
runtime: python310 

instance_class: F1

#the name of service to be deployed
service: service-name


# Write your envs here
env_variables:
  INSTANCE_NAME: "My project name",
  
  HOST_PORT: 443


entrypoint: gunicorn -b :$PORT main:app


`;

const requirementsValue = `
Flask==2.2.2


`;

export {mainvalue,appYamlValue,requirementsValue};