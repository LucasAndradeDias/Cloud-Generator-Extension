
import * as vscode from 'vscode';
import { Gcp, System } from '../../tools/tools';
import { Ifunction,Regions} from "../../../interfaces/interfaces";

const deployCloudFunctions = async () =>{

    const Sys = new System

    const projectpath = await questionBox("entry","The path to project folder (ex. windows: 'C:/documents/FuncFunc')",/^([a-zA-Z]:)?(\\[^<>:"/\\|?*]+)+\\?$/,"Invalid path")

    if (!await Sys.checkPath(projectpath)){
        vscode.window.showErrorMessage("Path not found");
        return
    }

    const config: Ifunction = {
        "localPath": projectpath,
        "name": await questionBox("name","me de o nome"),
        "entryPoint": await questionBox("entry","me de o entry"), 
        "region":Regions["asia-east1"],
        "runtime": await questionBox("Runtime","The runtime of function (ex. Python39)"),
        "trigger":await vscode.window.showQuickPick(["http"]).then(data=>"http")
    }
    

    const gcpClass = new Gcp();

    await gcpClass.iniciate();

    await gcpClass.createCloudFunction(config)

};



let questionBox: any = async (title?: string, placeHolder?: string, regexSyntax?: string, msgInvalid?: string) => {
    return new Promise<string>((resolve) => {
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
            return
        });
    });
};



export{deployCloudFunctions};