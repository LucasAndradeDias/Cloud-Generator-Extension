import { Gcp,System } from '../../tools/tools';

import * as vscode from 'vscode';
const { spawn } = require('node:child_process');
const { exec } = require('node:child_process');


// Windows
const deployCloudFunctions = async () =>{
    
    const gcpClass = new Gcp();

    gcpClass.iniciate();


    await gcpClass.cloudFunctionDeploy("D:\\projects\\FuncFunc");
    



};

export{deployCloudFunctions};