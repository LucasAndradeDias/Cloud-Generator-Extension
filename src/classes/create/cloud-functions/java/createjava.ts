import {TextEncoder } from 'util';
import * as vscode from 'vscode';
import { mainvalue, buildvalue} from './values';


const createJavaProject = async () => { 
    if(vscode.workspace.workspaceFolders !== undefined) {

        var projectName:string = "Java Cloud Functions Project";


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
        

        // Create main.py and add the content it takes 
        
        const mainfilepath = vscode.Uri.joinPath(targeturi,`${projectName}/main.java`);
        vscode.workspace.fs.writeFile(mainfilepath, new TextEncoder().encode(mainvalue)).then;

        // create build.gradle
        const buildpath = vscode.Uri.joinPath(targeturi,`${projectName}/build.gradle`);
        vscode.workspace.fs.writeFile(buildpath, new TextEncoder().encode(buildvalue));
    
        // Info about success 
        vscode.window.showInformationMessage("New Java cloud functions project: '"+projectName+"' created." );
    
    } 
    else {
        var errorMessage = "There were an error on building project" ;
        vscode.window.showErrorMessage(errorMessage);

    }

};

export {createJavaProject};