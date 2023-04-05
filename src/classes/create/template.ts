import * as vscode from 'vscode';
import path = require('path');



export class CodeTemplates implements vscode.TreeDataProvider<Template> {

    private templateClouds: Template[];


    constructor(){
        this.templateClouds = [
            new Template("Google Cloud Platform",vscode.TreeItemCollapsibleState.Expanded,undefined,"google-cloud.svg")
        ];
    }


    getTreeItem(element: Template): vscode.TreeItem | Thenable<vscode.TreeItem> {
        return element;
    }

    getChildren(element: Template): Thenable<Template[]> {
        

        const googleCloudChildren =  [
            new Template("App Engine: Python 3.9",vscode.TreeItemCollapsibleState.None,{"command":"CloudGenerator.createAppEnginePython","title":"Gen template of App Engine Code"},"app_engine.svg"),
            new Template("App Engine: Node Express",vscode.TreeItemCollapsibleState.None,{"command":"CloudGenerator.createAppEngineExpress","title":"Gen template of App Engine Code"},"app_engine.svg"),
            new Template("App Engine: Node React",vscode.TreeItemCollapsibleState.None,{"command":"CloudGenerator.createAppEngineReact","title":"Gen template of App Engine Code"},"app_engine.svg"),
            new Template("Cloud Functions: Node Event",vscode.TreeItemCollapsibleState.None,{"command":"CloudGenerator.createEventNodeProject","title":"Gen template of App Engine Code"},"cloud_functions.svg"),
            new Template("Cloud Functions: Node Http",vscode.TreeItemCollapsibleState.None,{"command":"CloudGenerator.createHttpNodeProject","title":"Gen template of App Engine Code"},"cloud_functions.svg"),
            new Template("Cloud Functions: Python Http",vscode.TreeItemCollapsibleState.None,{"command":"CloudGenerator.createHttpPythonFunction","title":"Gen template of App Engine Code"},"cloud_functions.svg"),
            new Template("Cloud Functions: Python Event",vscode.TreeItemCollapsibleState.None,{"command":"CloudGenerator.createEventPythonFunction","title":"Gen template of App Engine Code"},"cloud_functions.svg"),
            new Template("Cloud Functions: Golang Event",vscode.TreeItemCollapsibleState.None,{"command":"CloudGenerator.createEventGoProject","title":"Gen template of App Engine Code"},"cloud_functions.svg"),
            new Template("Cloud Functions: Java Event",vscode.TreeItemCollapsibleState.None,{"command":"CloudGenerator.createEventJavaProject","title":"Gen template of App Engine Code"},"cloud_functions.svg"),
        
        ];


        
        if (element){

            switch (element.label){
                case("Google Cloud Platform"):
                    googleCloudChildren.map( child=>{
                        element.addChild(child);
                    });
                break;
                
            }

            return Promise.resolve(element.children);
        }else {
            
            return Promise.resolve(this.templateClouds)
        }

    }

}

class Template extends vscode.TreeItem{

    public children:Template[] = [];


    constructor(
        public readonly label: string,
        public readonly collapsibleState: vscode.TreeItemCollapsibleState | undefined,
        public readonly command?:vscode.Command | undefined,
        public readonly iconName?:string | undefined,
        public readonly contextValue?:string | undefined
        ){

        super(label);
        this.iconPath = path.join(__filename,"..","..","..","..","icons/",iconName ? iconName : "icons8-acesso-cloud-24.png");
    }

    addChild(element:Template){

        this.children.push(element);
    }

}