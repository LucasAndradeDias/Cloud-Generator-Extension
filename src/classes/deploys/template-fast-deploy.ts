import path = require('path');
import * as vscode from 'vscode';


export class DeployProvider implements vscode.TreeDataProvider<DeployElement>{
    
    private deployItems: DeployElement[];
    
    constructor() {        
        
        this.deployItems = [
            new DeployElement("Google Cloud Platform",vscode.TreeItemCollapsibleState.Expanded,"google-cloud.png") 
        ];
    }

    getTreeItem(element: DeployElement): vscode.TreeItem {
        return element;
    }

    getChildren(element?:DeployElement): Thenable<DeployElement[]>{ 

        if (element){
            
            switch (element.name){
                case("Google Cloud Platform"):
                    element.addChild(
                        new DeployElement(
                            "Deploy: Cloud Function",
                            vscode.TreeItemCollapsibleState.None,
                            "cloud_functions.png",
                            {"command":"skymate.deployCloudFunctions","title":"Deploy Cloud Function Project"},

                        )
                    );
                    break;
            }

            return Promise.resolve(element.children);
        }
        else {
            return Promise.resolve(this.deployItems);
        }
    }
}

class DeployElement extends vscode.TreeItem {

    public children: DeployElement[] = [];

    constructor(
        public readonly name: string,
        public readonly collapsibleState: vscode.TreeItemCollapsibleState,
        public readonly iconName?:string,
        public readonly command?:vscode.Command
        ) 
    {
        super(name, collapsibleState);
        this.iconPath = path.join(__filename,"..","..","..","..","icons/",iconName ? iconName : "icons8-acesso-cloud-24.png");
    }

    addChild(child: DeployElement){this.children.push(child);}


}


