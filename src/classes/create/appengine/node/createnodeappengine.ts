import { TextEncoder } from 'util';
import * as vscode from 'vscode';
import { expressvalue,reactValue,appYamlValue,packagevalueReact,packagevalueExpress,gcloudignore,gitignore } from './values';

const createExpressAppengineProject = ()=>{

    if(vscode.workspace.workspaceFolders !== undefined) {

        // Uri of current workspace 
        let targeturi = vscode.workspace.workspaceFolders[0].uri;       

        // Create the src folder
        const newuri = vscode.Uri.joinPath(targeturi,"/express-appengine-project/src");
        vscode.workspace.fs.createDirectory(newuri);

        // Create app.js and add the content it takes 
        const mainfilePath = vscode.Uri.joinPath(targeturi,"/express-appengine-project/app.js");
        vscode.workspace.fs.writeFile(mainfilePath, new TextEncoder().encode(expressvalue));

        // Create app.yaml
        const appyamlPath = vscode.Uri.joinPath(targeturi,"/express-appengine-project/app.yaml");
        vscode.workspace.fs.writeFile(appyamlPath,new TextEncoder().encode(appYamlValue)); 

        // Create .gcloudignore 
        const gcloudignorePath = vscode.Uri.joinPath(targeturi,"/express-appengine-project/.gcloudignore");
        vscode.workspace.fs.writeFile(gcloudignorePath,new TextEncoder().encode(gcloudignore));

        // Create .gitignore
        const gitignorePath = vscode.Uri.joinPath(targeturi,"/express-appengine-project/.gitignore");
        vscode.workspace.fs.writeFile(gitignorePath,new TextEncoder().encode(gitignore));

        // create package.json
        const packagepath = vscode.Uri.joinPath(targeturi,"/express-appengine-project/package.json");
        vscode.workspace.fs.writeFile(packagepath, new TextEncoder().encode(packagevalueExpress));


    } 
    else {
        var errorMessage = "There were an error on building project" ;
        vscode.window.showErrorMessage(errorMessage);
    }
};


const createReactAppengineProject= ()=>{

    if(vscode.workspace.workspaceFolders !== undefined) {


        // Uri of current workspace 
        let targeturi = vscode.workspace.workspaceFolders[0].uri;       

        // Create the src folder
        const newuri = vscode.Uri.joinPath(targeturi,"/react-appengine-project/src");
        vscode.workspace.fs.createDirectory(newuri);

        // Create app.js and add the content it takes 
        const mainfilePath = vscode.Uri.joinPath(targeturi,"/react-appengine-project/app.js");
        vscode.workspace.fs.writeFile(mainfilePath, new TextEncoder().encode(reactValue));

        // Create app.yaml
        const appyamlPath = vscode.Uri.joinPath(targeturi,"/react-appengine-project/app.yaml");
        vscode.workspace.fs.writeFile(appyamlPath,new TextEncoder().encode(appYamlValue)); 

        // Create .gcloudignore 
        const gcloudignorePath = vscode.Uri.joinPath(targeturi,"/react-appengine-project/.gcloudignore");
        vscode.workspace.fs.writeFile(gcloudignorePath,new TextEncoder().encode(gcloudignore));

        // Create .gitignore
        const gitignorePath = vscode.Uri.joinPath(targeturi,"/react-appengine-project/.gitignore");
        vscode.workspace.fs.writeFile(gitignorePath,new TextEncoder().encode(gitignore));

        // create package.json
        const packagepath = vscode.Uri.joinPath(targeturi,"/react-appengine-project/package.json");
        vscode.workspace.fs.writeFile(packagepath, new TextEncoder().encode(packagevalueReact));

    } 
    else {
        var errorMessage = "There were an error on building project" ;
        vscode.window.showErrorMessage(errorMessage);
    }
};


export {createExpressAppengineProject, createReactAppengineProject};