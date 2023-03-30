import path = require('path');
import * as vscode from 'vscode';



export class CloudGeneratorProvider implements vscode.TreeDataProvider<DeployFuncElement>{
    constructor(private workspaceRoot: string) {}

    getTreeItem(element: DeployFuncElement): vscode.TreeItem {
        return element;
    }

    getChildren(element?:DeployFuncElement): Thenable<DeployFuncElement[]>{

        if(!this.workspaceRoot){
            vscode.window.showErrorMessage("Empty workspace");
            return Promise.resolve([]);
        }

        //  return one element test
        let lista = [
            new DeployFuncElement("Cloud Function",{"command":"CloudGenerator.deployCloudFunctions","title":"Deploy Cloud Function Project"},vscode.TreeItemCollapsibleState.None,"google-cloud-functions-svgrepo-com.svg"),
            new DeployFuncElement("Cloud Run Deploy",{"command":"CloudGenerator.deployCloudFunctions","title":"Deploy Cloud Function Project"},vscode.TreeItemCollapsibleState.None,"cloudRun.svg")
        ];

        return Promise.resolve(lista);

    }

}



class DeployFuncElement extends vscode.TreeItem {
    constructor(
        public readonly name: string,
        public readonly command:vscode.Command,
        public readonly collapsibleState: vscode.TreeItemCollapsibleState,
        public readonly iconName:string,
        ) 
    {
        super(name, collapsibleState);
        this.iconPath = path.join(__filename,"..","..","icons/",iconName);
    }
}