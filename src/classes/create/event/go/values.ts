


const mainvalues = `package main

import (
    "context"

    "github.com/GoogleCloudPlatform/functions-framework-go/functions"
    "github.com/cloudevents/sdk-go/v2/event"
)

func init() {
    // Register a CloudEvent function with the Functions Framework
    functions.CloudEvent("MyCloudEventFunction", myCloudEventFunction)
}

func main(ctx context.Context, e event.Event) error {
    // Write your code and access the event data using e.Data() or e.DataAs(...)

    return nil
}`;



export {mainvalues};