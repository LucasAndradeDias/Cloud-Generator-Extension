import {TextEncoder } from 'util';
import * as vscode from 'vscode';
import { maineventvalues} from './values';

import {exec} from "child_process";

const createGoProject = async () => { 
    if(vscode.workspace.workspaceFolders !== undefined) {

        var projectName:string = "Go Cloud Functions Project";


        await vscode.window.showInputBox({placeHolder:"Write the project name",validateInput(value) {
            let regCheck = new RegExp ('[a-z\d]+');

            if (!regCheck.test(value))
            {return "Please give me a name.";}

            return null;
        },
        })
        
        .then((value:string | undefined)=>{projectName = `${value}`;});

        if(projectName === "undefined"){return Error;}

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

        vscode.window.showInformationMessage("New Golang cloud functions project '"+projectName+"' created." );
    } 
    else {

        var errorMessage = "There were an error on building project" ;
        vscode.window.showErrorMessage(errorMessage);

    }

};

export {createGoProject};