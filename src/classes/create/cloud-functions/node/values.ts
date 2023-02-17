

const eventmainvalue = "const functions = require('@google-cloud/functions-framework')\n\n\n// Register a CloudEvent function with the Functions Framework\nfunctions.cloudEvent('myCloudEventFunction', cloudEvent => {  \n// Your code here\n// Access the CloudEvent data payload via cloudEvent.data\n});";

const httpmainvalue =  `const functions = require('@google-cloud/functions-framework');

// Register an HTTP function with the Functions Framework
functions.http('myHttpFunction', (req, res) => {
  // Your code here

  // Send an HTTP response
  res.send('OK');
});
`;

const packagevalue = '{\n  "dependencies": \n      {\n         "@google-cloud/functions-framework": "^1.0.3"         \n}\n}';



export {eventmainvalue,httpmainvalue,packagevalue,};