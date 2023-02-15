

import { strict } from 'assert';
import { error } from 'console';
import { TextDecoder, TextEncoder } from 'util';
import * as vscode from 'vscode';
import { mainvalue,requirementsvalue  } from './mainpyvalyes';


const createPythonProject = () => { 
    if(vscode.workspace.workspaceFolders !== undefined) {

        // Uri of current workspace 
        let targeturi = vscode.workspace.workspaceFolders[0].uri;
                
        // Create the src folder
        
        const newuri = vscode.Uri.joinPath(targeturi,"/python-cloud-function/src");
        
        vscode.workspace.fs.createDirectory(newuri);
        

        // Create main.py and add the content it takes 
        
        const mainfilepath = vscode.Uri.joinPath(targeturi,"/python-cloud-function/main.py");

        vscode.workspace.fs.writeFile(mainfilepath, new TextEncoder().encode(mainvalue));

        // create requirements.txt
        const requirementspath = vscode.Uri.joinPath(targeturi,"/python-cloud-function/requirements.txt");

        vscode.workspace.fs.writeFile(mainfilepath, new TextEncoder().encode(requirementsvalue));


    } 
    else {
        var errorMessage = "There were an error to find the " ;
    
        vscode.window.showErrorMessage(errorMessage);

    }



};

export {createPythonProject};

