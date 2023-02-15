

import { strict } from 'assert';
import { error } from 'console';
import { TextDecoder, TextEncoder } from 'util';
import * as vscode from 'vscode';
import { mainvalue, packagevalue} from './values';


const createNodeProject = () => { 
    if(vscode.workspace.workspaceFolders !== undefined) {

        // Uri of current workspace 
        let targeturi = vscode.workspace.workspaceFolders[0].uri;
                
        // Create the src folder
        
        const newuri = vscode.Uri.joinPath(targeturi,"/node-cloud-function/src");
        
        vscode.workspace.fs.createDirectory(newuri);
        

        // Create main.py and add the content it takes 
        
        const mainfilepath = vscode.Uri.joinPath(targeturi,"/node-cloud-function/main.js");

        vscode.workspace.fs.writeFile(mainfilepath, new TextEncoder().encode(mainvalue)).then;

        // create package.json
        const packagepath = vscode.Uri.joinPath(targeturi,"/node-cloud-function/package.json");

        vscode.workspace.fs.writeFile(packagepath, new TextEncoder().encode(packagevalue));

    } 
    else {
        var errorMessage = "There were an error on building project" ;
    
        vscode.window.showErrorMessage(errorMessage);

    }



};

export {createNodeProject};