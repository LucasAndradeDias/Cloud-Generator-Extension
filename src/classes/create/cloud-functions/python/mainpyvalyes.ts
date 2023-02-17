

const eventmainvalue = "import ast\nimport base64  \n\n#Entry function (main) \ndef main(event, context):\n    #decode the message the event sent\n  message = base64.b64decode(event['data']).decode('utf-8')\n message = ast.literal_eval(message) \n   #Write your code here\n\n\n\n\n\n\n\nreturn";

const httpmainvalues =  `import functions_framework

# Register an HTTP function with the Functions Framework
@functions_framework.http
def my_http_function(request):
  # Your code here

  # Return an HTTP response
  return 'OK'`;

const requirementsvalue = "google-cloud-functions";

export {eventmainvalue,httpmainvalues,requirementsvalue};
