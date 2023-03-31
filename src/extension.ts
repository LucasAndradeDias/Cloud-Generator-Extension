import * as vscode from 'vscode';

// Deploy functions
import {deployCloudFunctions} from "./classes/deploys/gcp/deploygcp";





// App engine pre build templates
import {createAppEnginePythonProject} from './classes/create/appengine/python/createpythonappengine';
import { createExpressAppengineProject,createReactAppengineProject } from './classes/create/appengine/node/createnodeappengine';

// Cloud Functions pre build templates
import { createPythonProject } from './classes/create/cloud-functions/python/createpython';
import { createGoProject } from './classes/create/cloud-functions/go/creategolang';
import { createJavaProject } from './classes/create/cloud-functions/java/createjava';
import { creatNodeProject } from './classes/create/cloud-functions/node/createnode';



// Importing views
import {DeployProvider} from "./Cloud-generatorProvider"



export function activate(context: vscode.ExtensionContext) {

	// Deploy Test
	context.subscriptions.push(vscode.commands.registerCommand("CloudGenerator.deployCloudFunctions",()=>{deployCloudFunctions();}));




	// APP ENGINE PRE BUILD TEMPLATES 
	// Python
	context.subscriptions.push(vscode.commands.registerCommand("CloudGenerator.createAppEnginePython",()=>{createAppEnginePythonProject();}));

	// Node - express
	context.subscriptions.push(vscode.commands.registerCommand("CloudGenerator.createAppEngineExpress",()=>{createExpressAppengineProject();}));
	// Node - React
	context.subscriptions.push(vscode.commands.registerCommand("CloudGenerator.createAppEngineReact",()=>{createReactAppengineProject();}));




	// CLOUD FUNCTION PRE BUILD TEMPLATE HTTP ----
	// node
	context.subscriptions.push(vscode.commands.registerCommand("CloudGenerator.createHttpNodeProject", ()=>{creatNodeProject();}));
	// python
	context.subscriptions.push(vscode.commands.registerCommand("CloudGenerator.createHttpPythonFunction", ()=>{createPythonProject();}));


	// CLOUD FUNCTION PRE BUILD TEMPLATES EVENT DRIVEN  ----- 
	
	// python
	context.subscriptions.push(vscode.commands.registerCommand("CloudGenerator.createEventPythonFunction", ()=>{createPythonProject("event");}));

	// node
	context.subscriptions.push(vscode.commands.registerCommand("CloudGenerator.createEventNodeProject", ()=>{creatNodeProject("event");}));

	// Golang
	context.subscriptions.push(vscode.commands.registerCommand("CloudGenerator.createEventGoProject", ()=>{createGoProject();} ));

	//Java
	context.subscriptions.push(vscode.commands.registerCommand("CloudGenerator.createEventJavaProject", ()=>{createJavaProject();}));


	vscode.window.registerTreeDataProvider("CloudGenerator",new DeployProvider());
	


}

export function deactivate() {}

