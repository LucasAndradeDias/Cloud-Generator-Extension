import { TextEncoder } from 'util';
import * as vscode from 'vscode';
import { mainvalue ,appYamlValue, requirementsValue } from './values';

// TODO: Add .gcloudignore and .gitignore
const createAppEnginePythonProject = async () => {
    if (vscode.workspace.workspaceFolders !== undefined) {

        var projectName:string = "Python App Engine Project";

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

        // Create src folder
        const newuri = vscode.Uri.joinPath(targeturi, `/${projectName}/src`);
        vscode.workspace.fs.createDirectory(newuri);

        // Create main.py and add the content it takes 
        const mainfilepath = vscode.Uri.joinPath(targeturi, `/${projectName}/main.py`);
        vscode.workspace.fs.writeFile(mainfilepath, new TextEncoder().encode(mainvalue));

        // Create app.yaml
        const yamlPath = vscode.Uri.joinPath(targeturi,`/${projectName}/app.yaml`);
        vscode.workspace.fs.writeFile(yamlPath, new TextEncoder().encode(appYamlValue(projectName)));

        // create requirements.txt
        const requirementspath = vscode.Uri.joinPath(targeturi, `/${projectName}/requirements.txt`);
        vscode.workspace.fs.writeFile(requirementspath, new TextEncoder().encode(requirementsValue));

        // Info about success 
        vscode.window.showInformationMessage("New App Engine Python project: '"+projectName+"' created." );

    }
    else {
        var errorMessage = "There were an error to find the ";

        vscode.window.showErrorMessage(errorMessage);
    }


};

export { createAppEnginePythonProject };

