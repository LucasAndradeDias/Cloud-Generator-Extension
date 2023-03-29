
import * as vscode from 'vscode';
import { Gcp } from '../../tools/tools';
import {Generation, Ifunction,InstanceConfig,Regions} from "../../../interfaces/interfaces"


// Windows
const deployCloudFunctions = async () =>{
    
    const gcpClass = new Gcp();

    await gcpClass.iniciate();

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

    await gcpClass.createCloudFunction(config)
    .catch((err)=>{
        vscode.window.showErrorMessage(err.message);
        console.log("erro ",err.message);}
    ).then(data=>{console.log("data ",data)})
    ;
    



};

export{deployCloudFunctions};