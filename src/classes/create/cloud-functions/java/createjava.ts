import {TextEncoder } from 'util';
import * as vscode from 'vscode';
import { mainvalue, buildvalue} from './values';


const createJavaProject = () => { 
    if(vscode.workspace.workspaceFolders !== undefined) {

        // Uri of current workspace 
        let targeturi = vscode.workspace.workspaceFolders[0].uri;
                
        // Create the src folder
        
        const newuri = vscode.Uri.joinPath(targeturi,"/java-cloud-function/src");
        vscode.workspace.fs.createDirectory(newuri);
        

        // Create main.py and add the content it takes 
        
        const mainfilepath = vscode.Uri.joinPath(targeturi,"/java-cloud-function/main.java");
        vscode.workspace.fs.writeFile(mainfilepath, new TextEncoder().encode(mainvalue)).then;

        // create build.gradle
        const buildpath = vscode.Uri.joinPath(targeturi,"/java-cloud-function/build.gradle");
        vscode.workspace.fs.writeFile(buildpath, new TextEncoder().encode(buildvalue));
    } 
    else {
        var errorMessage = "There were an error on building project" ;
        vscode.window.showErrorMessage(errorMessage);

    }

};

export {createJavaProject};