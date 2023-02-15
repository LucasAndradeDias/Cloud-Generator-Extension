const mainvalue = `
package mycloudeventfunction;

import com.google.cloud.functions.CloudEventsFunction;
import io.cloudevents.CloudEvent;

// Define a class that implements the CloudEventsFunction interface
public class MyCloudEventFunction implements CloudEventsFunction {
  // Implement the accept() method to handle CloudEvents
  @Override
  public void accept(CloudEvent event) {
    // Your code here
    // Access the CloudEvent data payload via event.getData()
    // To get the data payload as a JSON string, use:
    // new String(event.getData().toBytes())
  }
}
`;

const buildvalue = `
apply plugin: 'java'

repositories {
  jcenter()
  mavenCentral()
}
configurations {
    invoker
}

dependencies {
  // Every function needs this dependency to get the Functions Framework API.
  compileOnly 'com.google.cloud.functions:functions-framework-api:1.0.4'

  // To run function locally using Functions Framework's local invoker
  invoker 'com.google.cloud.functions.invoker:java-function-invoker:1.1.0'

  // These dependencies are only used by the tests.
  testImplementation 'com.google.cloud.functions:functions-framework-api:1.0.4'
  testImplementation 'junit:junit:4.13.2'
  testImplementation 'com.google.truth:truth:1.1.3'
  testImplementation 'org.mockito:mockito-core:4.11.0'

}

// Register a "runFunction" task to run the function locally
tasks.register("runFunction", JavaExec) {
  main = 'com.google.cloud.functions.invoker.runner.Invoker'
  classpath(configurations.invoker)
  inputs.files(configurations.runtimeClasspath, sourceSets.main.output)
  args(
    '--target', project.findProperty('run.functionTarget') ?: '',
    '--port', project.findProperty('run.port') ?: 8080
  )
  doFirst {
    args('--classpath', files(configurations.runtimeClasspath, sourceSets.main.output).asPath)
  }
}`;


export {mainvalue,buildvalue};