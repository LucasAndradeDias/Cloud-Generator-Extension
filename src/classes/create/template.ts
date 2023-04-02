import * as vscode from 'vscode';
import path = require('path');



export class CodeTemplates implements vscode.TreeDataProvider<Template> {


    getTreeItem(element: Template): vscode.TreeItem | Thenable<vscode.TreeItem> {
        return element;
    }

    getChildren(): Thenable<Template[]> {

        return Promise.resolve([
            new Template("App Engine: Python 3.9",vscode.TreeItemCollapsibleState.None,{"command":"CloudGenerator.createAppEnginePython","title":"Gen template of App Engine Code"},"app-engine-svgrepo-com.svg"),
            new Template("App Engine: Node Express",vscode.TreeItemCollapsibleState.None,{"command":"CloudGenerator.createAppEngineExpress","title":"Gen template of App Engine Code"},"app-engine-svgrepo-com.svg"),
            new Template("App Engine: Node React",vscode.TreeItemCollapsibleState.None,{"command":"CloudGenerator.createAppEngineReact","title":"Gen template of App Engine Code"},"app-engine-svgrepo-com.svg"),
            new Template("Cloud Functions: Node Event",vscode.TreeItemCollapsibleState.None,{"command":"CloudGenerator.createEventNodeProject","title":"Gen template of App Engine Code"},"google-cloud-functions-svgrepo-com.svg"),
            new Template("Cloud Functions: Node Http",vscode.TreeItemCollapsibleState.None,{"command":"CloudGenerator.createHttpNodeProject","title":"Gen template of App Engine Code"},"google-cloud-functions-svgrepo-com.svg"),
            new Template("Cloud Functions: Python Http",vscode.TreeItemCollapsibleState.None,{"command":"CloudGenerator.createHttpPythonFunction","title":"Gen template of App Engine Code"},"google-cloud-functions-svgrepo-com.svg"),
            new Template("Cloud Functions: Python Event",vscode.TreeItemCollapsibleState.None,{"command":"CloudGenerator.createEventPythonFunction","title":"Gen template of App Engine Code"},"google-cloud-functions-svgrepo-com.svg"),
            new Template("Cloud Functions: Golang Event",vscode.TreeItemCollapsibleState.None,{"command":"CloudGenerator.createEventGoProject","title":"Gen template of App Engine Code"},"google-cloud-functions-svgrepo-com.svg"),
            new Template("Cloud Functions: Java Event",vscode.TreeItemCollapsibleState.None,{"command":"CloudGenerator.createEventJavaProject","title":"Gen template of App Engine Code"},"google-cloud-functions-svgrepo-com.svg"),
        
        ]);

    }

}

class Template extends vscode.TreeItem{

    constructor(
        public readonly label: string,
        public readonly collapsibleState: vscode.TreeItemCollapsibleState,
        public readonly command?:vscode.Command,
        public readonly iconName?:string,
        public readonly contextValue?:string
        ){

        super(label);
        console.log(path.join(__filename,"..","..","..","..","icons/",iconName ? iconName : "icons8-acesso-cloud-24.png"))
        this.iconPath = path.join(__filename,"..","..","..","..","icons/",iconName ? iconName : "icons8-acesso-cloud-24.png");
    }

}