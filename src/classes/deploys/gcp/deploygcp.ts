
import * as vscode from 'vscode';
import { Gcp } from '../../tools/tools';
import {CreateFunction,AdvancedConfig} from "../../../interfaces/interfaces"


// Windows
const deployCloudFunctions = async () =>{
    
    const gcpClass = new Gcp();

    gcpClass.iniciate();


    let advancedConfig:AdvancedConfig = {"memory":"1024MB","securityLevel":"secure-optional","timeout":500};

    await gcpClass.createCloudFunction( {"entryPoint":"main",
    "functionName":"testFunc2",
    "projectPath":"D:\\projects\\FuncFunc",
    "region":"us-central1",
    "runtime":"python39",
    "trigger":"http",
    "instanceConfig":advancedConfig
    })
    .catch((err)=>{
        vscode.window.showErrorMessage(err.message);
        console.log("erro ",err.message);}
    );
    



};

export{deployCloudFunctions};