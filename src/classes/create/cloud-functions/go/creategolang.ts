import {TextEncoder } from 'util';
import * as vscode from 'vscode';
import { maineventvalues} from './values';

import {exec} from "child_process";

const createGoEventProject = () => { 
    if(vscode.workspace.workspaceFolders !== undefined) {

        // Uri of current workspace 
        let targeturi = vscode.workspace.workspaceFolders[0].uri;
                
        // Create the src folder
        
        const newuri = vscode.Uri.joinPath(targeturi,"/go-cloud-function/src");
        vscode.workspace.fs.createDirectory(newuri);
        

        // Create main.go and add the content it takes 
        
        const mainfilepath = vscode.Uri.joinPath(targeturi,"/go-cloud-function/main.go");
        vscode.workspace.fs.writeFile(mainfilepath, new TextEncoder().encode(maineventvalues)).then;

        // create go.mod
        exec("cd go-cloud-function && mkdir teste && go mod init main/packages && go mod tidy");
        
    } 
    else {
        var errorMessage = "There were an error on building project" ;
    
        vscode.window.showErrorMessage(errorMessage);

    }

};

const createGoProject = () => { 
    if(vscode.workspace.workspaceFolders !== undefined) {

        // Uri of current workspace 
        let targeturi = vscode.workspace.workspaceFolders[0].uri;
                
        // Create the src folder
        
        const newuri = vscode.Uri.joinPath(targeturi,"/go-cloud-function/src");
        vscode.workspace.fs.createDirectory(newuri);
        

        // Create main.go and add the content it takes 
        
        const mainfilepath = vscode.Uri.joinPath(targeturi,"/go-cloud-function/main.go");
        vscode.workspace.fs.writeFile(mainfilepath, new TextEncoder().encode(maineventvalues)).then;

        // create go.mod
        exec("cd go-cloud-function && mkdir teste && go mod init main/packages && go mod tidy");
        
    } 
    else {
        var errorMessage = "There were an error on building project" ;
    
        vscode.window.showErrorMessage(errorMessage);

    }

};




export {createGoProject};