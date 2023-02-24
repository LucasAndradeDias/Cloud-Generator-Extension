import { TextEncoder } from 'util';
import * as vscode from 'vscode';
import { mainvalue ,appYamlValue, requirementsValue } from './values';

// TODO: Add .gcloudignore and .gitignore
const createAppEnginePythonProject = () => {
    if (vscode.workspace.workspaceFolders !== undefined) {

        // Uri of current workspace 
        let targeturi = vscode.workspace.workspaceFolders[0].uri;

        // Create src folder

        const newuri = vscode.Uri.joinPath(targeturi, "/python-appengine-project/src");
        vscode.workspace.fs.createDirectory(newuri);

        // Create main.py and add the content it takes 

        const mainfilepath = vscode.Uri.joinPath(targeturi, "/python-appengine-project/main.py");
        vscode.workspace.fs.writeFile(mainfilepath, new TextEncoder().encode(mainvalue));

        // Create app.yaml
        
        const yamlPath = vscode.Uri.joinPath(targeturi,"/python-appengine-project/app.yaml");
        vscode.workspace.fs.writeFile(yamlPath, new TextEncoder().encode(appYamlValue));



        // create requirements.txt
        const requirementspath = vscode.Uri.joinPath(targeturi, "/python-appengine-project/requirements.txt");
        vscode.workspace.fs.writeFile(requirementspath, new TextEncoder().encode(requirementsValue));

    }
    else {
        var errorMessage = "There were an error to find the ";

        vscode.window.showErrorMessage(errorMessage);
    }


};

export { createAppEnginePythonProject };

