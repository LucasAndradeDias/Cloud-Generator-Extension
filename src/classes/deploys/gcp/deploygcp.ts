
import * as vscode from 'vscode';
import { Gcp } from '../../tools/tools';
import {Generation, Ifunction,InstanceConfig,Regions} from "../../../interfaces/interfaces"


// Windows
const deployCloudFunctions = async () =>{
    
    console.log("ESTA AQUI AMIGO")

    const gcpClass = new Gcp();

    await gcpClass.iniciate();

    let projectPath = await vscode.window.showInputBox({placeHolder:"Path to function WITH TWO backslashs (ex. windows: 'D:\\projects\\FuncFunc')"}).then(data=>data);

    


    let advancedConfig:InstanceConfig = {"securityLevel":"secure-optional","timeout":500};

    let config:Ifunction = {
        name:"test-func2",
        entryPoint:"main",
        region:Regions["us-central1"],
        runtime:"python39",
        localPath:"D:\\projects\\FuncFunc",
        trigger:"http",
        instanceConfig:advancedConfig,
        generation:Generation["GEN2"]
    }

    // await gcpClass.createCloudFunction(config)
    // .catch((err)=>{
    //     vscode.window.showErrorMessage(err.message);
    //     console.log("erro ",err.message);}
    // )
    // .then(data=>{
    //     vscode.window.showInformationMessage("New cloud function deployed with success!🎉🎉 \n"+data);
    
    // });

};

export{deployCloudFunctions};