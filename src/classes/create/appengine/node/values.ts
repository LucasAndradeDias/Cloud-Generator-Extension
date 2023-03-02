const expressvalue = `
const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log("Example app listening on port ",port)
})
`;

const appYamlValue = (projectName:string)=>`
# Node version (Ex: node 18 = nodejs18)
runtime: nodejs18

instance_class: F1

#the name of service to be deployed
service: ${projectName}


# Write your envs here
env_variables:
  INSTANCE_NAME: "${projectName}",
  
  HOST_PORT: 443


entrypoint: node app.js
`; 

const packagevalueExpress = `
{
    "engines": {
        "node": "18.0.0"
    },
    "scripts": {
        "start": "node App.js"
      },
    "dependencies":{
        "express": "^4.18.2"
    }

}`;


const gcloudignore = `
/node_modules/
`;

const gitignore = `
/node_modules
`;


export {expressvalue,appYamlValue,packagevalueExpress,gcloudignore,gitignore};