
import * as vscode from 'vscode';
import { Gcp } from '../../tools/tools';
import { Ifunction,Regions} from "../../../interfaces/interfaces";

const deployCloudFunctions = async () =>{
    
    var config:Ifunction = {
        name:"",
        entryPoint: "",
        localPath:"",
        region:Regions["us-central1"],
        runtime:"",
        trigger:"http"
    };
    
    
    // Local Project Path
    const projectPaht = await vscode.window.showInputBox({
        placeHolder:"The path to project folder (ex. windows: 'C:/documents/FuncFunc')",
        title:"Google Cloud Functions Deploy",
        
        // Set a function to validate the input
        validateInput: (value:string ) =>{

            // Remove any whitespace from the input
            value.replace(" ","");

            // Create a regular expression to validate the input as a valid Windows path
            let windowsRegex = new RegExp(/^([a-zA-Z]:)?(\\[^<>:"/\\|?*]+)+\\?$/).test(value);
            
            // If the input matches the regular expression, return null to indicate that it is valid. 
            return  windowsRegex ? null : "Invalid path";}
            
    }).then(data=>{

            // If the user input is not empty or just whitespace, assign it to the config object's localPath property. Otherwise, the call it function again.
            if(data && data !== ("" || " ")){
                config.localPath = data;
            }else{
                projectPaht;
            }
    });

    if (config.localPath === "undefined"){return;}

    // Function name.
    const funcName = await vscode.window.showInputBox({
        placeHolder:"ID of the function or fully qualified identifier for the function. (ex. FuncFunc)",title:"Google Cloud Functions Deploy"
    }
    ).then(data=>{
        if(data && data !== ("" || " ")){
            config.name = data;
        }else{
            funcName;
        }
    });
    
    if (config.name === "undefined"){return;}

    // Prompt the user for the runtime of the function and set the value to the runtime property of the config object.
    const runtime = await vscode.window.showInputBox({placeHolder:"The runtime of function (ex. Python39)",
    "title":"Google Cloud Functions Deploy"})
    .then(data=>{
        if(data && data !== ("" || " ")){
            config.runtime = data;
        }else{
            runtime;
        }
    });

    if (config.runtime === "undefined"){return;}

    // Prompt the user for the entry-point of the function and set the value to the entry-point property of the config object.
    const entryPoint = await vscode.window.showInputBox({placeHolder:"The entrypoint of function (ex. main)",
    "title":"Google Cloud Functions Deploy"})
    .then(data=>{
        if(data && data !== ("" || " ")){
            config.entryPoint = data;
        }else{
            entryPoint;
        }
    });

    if (config.entryPoint){return;}

    // This code prompts the user to select a trigger type, using a quick pick menu with options provided as an array.
    const triggerType = await vscode.window.showQuickPick(["Http",
    "Pub/Sub event",
    "Cloud Storage event",
    "Firestore event",
    "Google Analytics event",
    "Firebase realtime database event",
    "Firebase Authentication"],{placeHolder:"Choose the trigger type of function",title:"Google Cloud Functions Deploy"})
    .then(data=>{
        if(data && data !== ("" || " ")){
            config.trigger = "http";
        }else{triggerType;}
    });

    if (config.trigger === null){return;}

    // The Cloud Storage Bucket the code will be saved;
    const bucket = await vscode.window.showInputBox({placeHolder:"Cloud Storage Bucket to store the code",
    "title":"Google Cloud Functions Deploy"})
    .then(data=>{
        if(data && data !== ("" || " ")){
            config.bucket = data;
        }else{
            bucket;
        }
    });

    if (config.bucket === "undefined"){return;}

        
    const gcpClass = new Gcp();

    await gcpClass.iniciate();
    

    vscode.window.withProgress({"location":{"viewId":"CloudGenerator"},"title":"Cloud Functions Deploy"},
        async (progress)=>{
        
        
        await gcpClass.createCloudFunction(config) // call function to create a cloud function

        .then(data=>{
            vscode.window.showInformationMessage("New cloud function deployed with success!🎉🎉 \n");
            progress.report({increment:100,"message":`${data}`});  // report final progress with data received
        })
        .catch((err)=>{
            vscode.window.showErrorMessage(err.message);
        });
    });


};

export{deployCloudFunctions};