
import { type } from 'os';
import { TextEncoder } from 'util';
import * as vscode from 'vscode';
import { eventmainvalue, httpmainvalue,packagevalue} from './values';

// create project
const creatNodeProject = async (type="http")=>{

    var mainvalue = "";
    // identify if it's http or event
    if (type === "http") { mainvalue = httpmainvalue;
    }else{ mainvalue = eventmainvalue; }


    if(vscode.workspace.workspaceFolders !== undefined) {


        var projectName:string = "Node Cloud Functions Project";


        await vscode.window.showInputBox({placeHolder:"Write the project name",validateInput(value) {

            let regCheck = new RegExp ('[a-z\d]+');

            if (!regCheck.test(value))
            {return "Please give me a name.";}

            return null;
        },
        })
        
        .then((value:string | undefined)=>{projectName = `${value}`;});

        if(projectName === "undefined"){return;}


        // Uri of current workspace 
        let targeturi = vscode.workspace.workspaceFolders[0].uri;
                
        // Create the src folder
        
        const newuri = vscode.Uri.joinPath(targeturi,`${projectName}/src`);
        vscode.workspace.fs.createDirectory(newuri);
        

        // Create main.js and add the content it takes 
        
        const mainfilepath = vscode.Uri.joinPath(targeturi,`${projectName}/main.js`);
        vscode.workspace.fs.writeFile(mainfilepath, new TextEncoder().encode(mainvalue)).then;

        // create package.json
        const packagepath = vscode.Uri.joinPath(targeturi,`${projectName}/package.json`);
        vscode.workspace.fs.writeFile(packagepath, new TextEncoder().encode(packagevalue));


        // Info about success 
        vscode.window.showInformationMessage("New NodeJs cloud functions project: '"+projectName+"' created." );

    } 
    else {
        var errorMessage = "There were an error on building project" ;
        vscode.window.showErrorMessage(errorMessage);
    }
};

export {creatNodeProject};