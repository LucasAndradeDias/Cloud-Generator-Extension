import { Gcp } from '../../tools/tools';

import * as vscode from 'vscode';
const { spawn } = require('node:child_process');
const { exec } = require('node:child_process');


// Windows
const  deployCloudFunctions = async () =>{
    

    // Check if the system permits scritps

    // 
    let inpu = await vscode.window.showInputBox().then((value)=>{
        vscode.window.showInformationMessage("INPUT "+value);
    }
    );
    vscode.window.showInformationMessage("INPUT2 "+inpu);


    // let gcpInstance = new Gcp("none","none");
    
    // await gcpInstance.changeProjectId("fine-doodad-275213");

    // await gcpInstance.getGcpInfos();

    // console.log(gcpInstance.projectId);


};

export{deployCloudFunctions};