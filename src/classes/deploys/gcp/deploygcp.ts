
import * as vscode from 'vscode';
import { Gcp, System } from '../../tools/gcp';
import { Ifunction,Regions} from "../../../interfaces/interfaces";

const deployCloudFunctions = async () =>{
    
    const Sys = new System

    const gcpClass = new Gcp();

    await gcpClass.iniciate();

    vscode.window.setStatusBarMessage("GCP Project Id: "+ gcpClass.projectId )

    vscode.window.showWarningMessage("GCP Project Id: "+gcpClass.projectId)

    const projectpath = await questionBox("Folder path","The path to project folder (ex. windows: 'C:/documents/FuncFunc')",/^([a-zA-Z]:)?(\\[^<>:"/\\|?*]+)+\\?$/,"Invalid path")
    if (!await Sys.checkPath(projectpath)){
        vscode.window.showErrorMessage("Path not found");
        return
    }

    const config: Ifunction = {
        "localPath": projectpath,
        "name": await questionBox("Name PROJECT: "+gcpClass.projectId,"New cloud function name"),
        "entryPoint": await questionBox("Entrypoint\n Project ID: "+gcpClass.projectId,"Function entrypoint"), 
        "region":Regions["asia-east1"],
        "runtime": await questionBox("Runtime","The runtime of function (ex. Python39)") ,
        "trigger":await vscode.window.showQuickPick(["http"]).then(data=>"http")
    }


    vscode.window.showWarningMessage(`local path: ${config.localPath} \n
    Name: ${config.name}
    Entrypoint: ${config.entryPoint}
    Region: asia-east1
    Runtime: ${config.runtime}
    Trigger: Http
    Gen: 1
    `)

    const confirm = await vscode.window.showQuickPick(["deploy","cancel"],{"title":`Press deploy to confirm the new deploy or cancel.`}).then(data=>data)
    
    if (confirm !== "deploy" || "true" || "yes") {return}


    vscode.window.withProgress({"location":{"viewId":"skymate"},"title":"Cloud Functions Deploy"},
        async (progress)=>{
            
        await gcpClass.createCloudFunction(config)

        .then(data=>{
            vscode.window.showInformationMessage("New cloud function deployed with success!🎉🎉 \n");
            progress.report({increment:100,"message":`${data}`}); 
        })
        .catch((err)=>{
            vscode.window.showErrorMessage(err.message);
        });
    });

};


let questionBox: any = async (title?: string, placeHolder?: string, regexSyntax?: string, msgInvalid?: string) => {
    return new Promise((resolve) => {
        const inputBox = vscode.window.createInputBox();
        inputBox.title = title;
        inputBox.prompt = placeHolder;
        inputBox.show();

        inputBox.onDidAccept(() => {
            const value = inputBox.value;

            if (regexSyntax){
                
                let regex = new RegExp(regexSyntax);

                if (!regex.test(value)) {
                    vscode.window.showErrorMessage(msgInvalid || "Invalid input");
                    return;
                }
            }            
            if (value !== "" || " "){

                inputBox.hide();
                resolve(value); 
            }

        });

        inputBox.onDidHide(e => {
            resolve(''); 
            return new Error("User canceled the function (pressed esc)")
        });
    });
};



export{deployCloudFunctions};