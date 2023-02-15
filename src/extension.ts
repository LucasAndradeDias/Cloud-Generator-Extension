// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

import { createPythonProject } from "./classes/create/event/python/createpython";

import {createNodeProject} from "./classes/create/event/node/createnode";

import { createGoProject } from './classes/create/event/go/creategolang';

import { createJavaProject } from './classes/create/event/java/createjava';



// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	context.subscriptions.push(vscode.commands.registerCommand("cloudFunctionsGenerator.createPythonFunction", ()=>{createPythonProject();}));

	context.subscriptions.push(vscode.commands.registerCommand("cloudFunctionsGenerator.createNodeProject", ()=>{createNodeProject();}));

	context.subscriptions.push(vscode.commands.registerCommand("cloudFunctionsGenerator.createGoProject", ()=>{createGoProject();} ));
	
	context.subscriptions.push(vscode.commands.registerCommand("cloudFunctionsGenerator.createJavaProject", ()=>{createJavaProject();} ));

}

// This method is called when your extension is deactivated
export function deactivate() {}
