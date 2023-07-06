import * as vscode from 'vscode';
import { System } from './classes/tools/gcp';


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
import {DeployProvider} from "./classes/deploys/template-fast-deploy"
import {CodeTemplates} from "./classes/create/template"




export async function activate(context: vscode.ExtensionContext) {

	if (!await new System().allowedSystem()){
		vscode.window.showInformationMessage(`Sorry, but there this extension is avalible in Windows Platform.`)
		return;
	}

    if (!new System().checkPolicy){
        vscode.window.showErrorMessage("Could run the needed scripts in command prompt. Please check your system scripts policy.");
        return;
    }
	
	
	// APP ENGINE PRE BUILD TEMPLATES 
	// Python
	context.subscriptions.push(vscode.commands.registerCommand("skymate.createAppEnginePython",()=>{createAppEnginePythonProject();}));

	// Node - express
	context.subscriptions.push(vscode.commands.registerCommand("skymate.createAppEngineExpress",()=>{createExpressAppengineProject();}));
	// Node - React
	context.subscriptions.push(vscode.commands.registerCommand("skymate.createAppEngineReact",()=>{createReactAppengineProject();}));
	
	
	
	
	// CLOUD FUNCTION PRE BUILD TEMPLATE HTTP ----
	// node
	context.subscriptions.push(vscode.commands.registerCommand("skymate.createHttpNodeProject", ()=>{creatNodeProject();}));
	// python
	context.subscriptions.push(vscode.commands.registerCommand("skymate.createHttpPythonFunction", ()=>{createPythonProject();}));


	// CLOUD FUNCTION PRE BUILD TEMPLATES EVENT DRIVEN  ----- 
	
	// python
	context.subscriptions.push(vscode.commands.registerCommand("skymate.createEventPythonFunction", ()=>{createPythonProject("event");}));
	
	// node
	context.subscriptions.push(vscode.commands.registerCommand("skymate.createEventNodeProject", ()=>{creatNodeProject("event");}));
	
	// Golang
	context.subscriptions.push(vscode.commands.registerCommand("skymate.createEventGoProject", ()=>{createGoProject();} ));

	//Java
	context.subscriptions.push(vscode.commands.registerCommand("skymate.createEventJavaProject", ()=>{createJavaProject();}));

	// Register TreeItem for serverless templates
	vscode.window.registerTreeDataProvider("serverless-templates",new CodeTemplates());

	///////
	// Fast-deploy


	// Register treeitem for deploy options
	vscode.window.registerTreeDataProvider("skymate",new DeployProvider());

	// DEPLOY GOOGLE CLOUD FUNCTIONS
	context.subscriptions.push(vscode.commands.registerCommand("skymate.deployCloudFunctions",()=>{deployCloudFunctions()}));

}	

export function deactivate() {}

