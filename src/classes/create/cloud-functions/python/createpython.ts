import { TextEncoder } from 'util';
import * as vscode from 'vscode';
import { eventmainvalue, httpmainvalues, requirementsvalue } from './mainpyvalyes';


const createPythonProject = async (type = "http") => {

    if (type === "http"){ var mainvalue = httpmainvalues;} else {var mainvalue = eventmainvalue; }

    if (vscode.workspace.workspaceFolders !== undefined) {

        
        var projectName:string = "Python Cloud Functions Project";

        await vscode.window.showInputBox({placeHolder:"Write the project name",validateInput(value){
            let regCheck = new RegExp ('[a-z\d]+');

            if (!regCheck.test(value))
            {return "Please give me a name.";}
            
            return null;

        }}).then((value)=>{projectName = `${value}`;});

        if(projectName === "undefined"){return;}

        
        // Uri of current workspace 
        let targeturi = vscode.workspace.workspaceFolders[0].uri;

        // Create the src folder

        const newuri = vscode.Uri.joinPath(targeturi, `${projectName}/src`);

        vscode.workspace.fs.createDirectory(newuri);

        // Create main.py and add the content it takes 

        const mainfilepath = vscode.Uri.joinPath(targeturi, `${projectName}/main.py`);

        vscode.workspace.fs.writeFile(mainfilepath, new TextEncoder().encode(mainvalue));

        // create requirements.txt
        const requirementspath = vscode.Uri.joinPath(targeturi, `${projectName}/requirements.txt`);

        vscode.workspace.fs.writeFile(requirementspath, new TextEncoder().encode(requirementsvalue));
    
        // Info about success 
        vscode.window.showInformationMessage("New Python cloud functions project: '"+projectName+"' created." );
    }
    else {
        var errorMessage = "There were an error to find the ";

        vscode.window.showErrorMessage(errorMessage);
    }
};

export { createPythonProject };

