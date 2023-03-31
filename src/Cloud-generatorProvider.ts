import path = require('path');
import * as vscode from 'vscode';



export class DeployProvider implements vscode.TreeDataProvider<DeployElement>{
    constructor() {}

    getTreeItem(element: DeployElement): vscode.TreeItem {
        return element;
    }

    getChildren(element?:DeployElement): Thenable<DeployElement[]>{



        //  return one element test
        let lista = [
            new DeployElement("Cloud Function",{"command":"CloudGenerator.deployCloudFunctions","title":"Deploy Cloud Function Project"},vscode.TreeItemCollapsibleState.None,"google-cloud-functions-svgrepo-com.svg")
        ];

        return Promise.resolve(lista);

    }



}



class DeployElement extends vscode.TreeItem {
    constructor(
        public readonly name: string,
        public readonly command:vscode.Command,
        public readonly collapsibleState: vscode.TreeItemCollapsibleState,
        public readonly iconName?:string
        ) 
    {
        super(name, collapsibleState);



        this.iconPath = path.join(__filename,"..","..","icons/",iconName ? iconName : "icons8-acesso-cloud-24.png");
    }

}