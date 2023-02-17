import * as vscode from 'vscode';


import { createPythonProject } from './classes/create/cloud-functions/python/createpython';
import { createGoProject } from './classes/create/cloud-functions/go/creategolang';
import { createJavaProject } from './classes/create/cloud-functions/java/createjava';
import { creatNodeProject } from './classes/create/cloud-functions/node/createnode';


export function activate(context: vscode.ExtensionContext) {


	// CLOUD FUNCTION PRE BUILD TEMPLATE HTTP ----
	// node
	context.subscriptions.push(vscode.commands.registerCommand("cloudFunctionsGenerator.createHttpNodeProject", ()=>{creatNodeProject();}));
	// python
	context.subscriptions.push(vscode.commands.registerCommand("cloudFunctionsGenerator.createHttpPythonFunction", ()=>{createPythonProject();}));








	// CLOUD FUNCTION PRE BUILD TEMPLATES EVENT DRIVEN  ----- 
	// python
	context.subscriptions.push(vscode.commands.registerCommand("cloudFunctionsGenerator.createEventPythonFunction", ()=>{createPythonProject("event");}));
	// node
	context.subscriptions.push(vscode.commands.registerCommand("cloudFunctionsGenerator.createEventNodeProject", ()=>{creatNodeProject("event");}));
	// Golang
	context.subscriptions.push(vscode.commands.registerCommand("cloudFunctionsGenerator.createEventGoProject", ()=>{createGoProject();} ));
	//Java
	context.subscriptions.push(vscode.commands.registerCommand("cloudFunctionsGenerator.createEventJavaProject", ()=>{createJavaProject();}));

}

export function deactivate() {}

