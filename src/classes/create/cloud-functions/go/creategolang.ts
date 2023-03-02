import {TextEncoder } from 'util';
import * as vscode from 'vscode';
import { maineventvalues} from './values';

import {exec} from "child_process";



const createGoProject = async () => { 
    if(vscode.workspace.workspaceFolders !== undefined) {

        var projectName:string = "";

        await vscode.window.showInputBox({placeHolder:"Write the project name"}).then((value)=>{projectName = `${value}`;});


        // Uri of current workspace 
        let targeturi = vscode.workspace.workspaceFolders[0].uri;
                
        // Create the src folder
        
        const newuri = vscode.Uri.joinPath(targeturi,`${projectName}/src`);
        vscode.workspace.fs.createDirectory(newuri);
        

        // Create main.go and add the content it takes 
        
        const mainfilepath = vscode.Uri.joinPath(targeturi,`${projectName}/main.go`);
        vscode.workspace.fs.writeFile(mainfilepath, new TextEncoder().encode(maineventvalues)).then;

        // create go.mod
        exec(`cd ${projectName} && go mod init main/packages && go mod tidy`);

        // Info about success 
        vscode.window.showInformationMessage("New Golang cloud functions project '"+projectName+"' created." );
    
        
    } 
    else {
        var errorMessage = "There were an error on building project" ;
    
        vscode.window.showErrorMessage(errorMessage);

    }

};




export {createGoProject};