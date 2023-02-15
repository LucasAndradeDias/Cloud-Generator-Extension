

const mainvalue = "const functions = require('@google-cloud/functions-framework')\n\n\n// Register a CloudEvent function with the Functions Framework\nfunctions.cloudEvent('myCloudEventFunction', cloudEvent => {  \n// Your code here\n// Access the CloudEvent data payload via cloudEvent.data\n});";

const packagevalue = '{\n  "dependencies": \n      {\n         "@google-cloud/functions-framework": "^1.0.3"         \n}\n}';

export {mainvalue,packagevalue};