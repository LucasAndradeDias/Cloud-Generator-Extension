
import * as vscode from 'vscode';
import { Gcp, System} from '../../tools/tools';
import {Generation, Ifunction,InstanceConfig,Regions} from "../../../interfaces/interfaces"

// Windows
const deployCloudFunctions = async () =>{
    
    var config:Ifunction = {
        name:"",
        entryPoint: "",
        localPath:"",
        region:Regions["us-central1"],
        runtime:"",
        trigger:"http"
    };

    
    // USER INPUTS
    
    // Local Project Path
    let projectPaht = await vscode.window.showInputBox({
        placeHolder:"The path to project folder (ex. windows: 'C:/documents/FuncFunc')",
        title:"Google Cloud Functions Deploy",
        
        // Set a function to validate the input
        validateInput: async (value:string ) =>{

            // Remove any whitespace from the input
            value.replace(" ","");

            // Create a regular expression to validate the input as a valid Windows path
            let windowsRegex = new RegExp(/^([a-zA-Z]:)?(\\[^<>:"/\\|?*]+)+\\?$/).test(value);
            
            // If the input matches the regular expression, return null to indicate that it is valid. 
            // Otherwise, return an error message.
            return  windowsRegex ? null : "Invalid path";}
            
    }).then(data=>{

            // If the user input is not empty or just whitespace, assign it to the config object's localPath property. Otherwise, the call it function again.
            if(data && data !== ("" || " ")){
                config.localPath = data;
            }else{
                projectPaht;
            }
        
    });

    // Function name.
    let funcName = await vscode.window.showInputBox({
        placeHolder:"ID of the function or fully qualified identifier for the function. (ex. FuncFunc)",title:"Google Cloud Functions Deploy"
    }).then(data=>{
        if(data && data !== ("" || " ")){
            config.name = data;
        }else{funcName;
        }
    });
    
    // Prompt the user for the runtime of the function and set the value to the runtime property of the config object.
    let runtime = await vscode.window.showInputBox({placeHolder:"The runtime of function (ex. Python39)",
    "title":"Google Cloud Functions Deploy"})
    .then(data=>{
        if(data && data !== ("" || " ")){
            config.runtime = data;
        }else{
            runtime;
        }
    });

    // Prompt the user for the runtime of the function and set the value to the runtime property of the config object.
    let entryPoint = await vscode.window.showInputBox({placeHolder:"The entrypoint of function (ex. main)",
    "title":"Google Cloud Functions Deploy"})
    .then(data=>{
        if(data && data !== ("" || " ")){
            config.entryPoint = data;
        }else{
            entryPoint;
        }
    });

    // This code prompts the user to select a trigger type, using a quick pick menu with options provided as an array.
    let triggerType = await vscode.window.showQuickPick(["Http",
    "Pub/Sub event",
    "Cloud Storage event",
    "Firestore event",
    "Google Analytics event",
    "Firebase realtime database event",
    "Firebase Authentication"],{placeHolder:"Choose the trigger type of function",title:"Google Cloud Functions Deploy"})
    .then(data=>{
        if(data && data !== ("" || " ")){
            config.trigger = "http";
        }else{triggerType;
        }
    });

    // The Cloud Storage Bucket the code will be saved;
    let bucket = await vscode.window.showInputBox({placeHolder:"Cloud Storage Bucket to store the code",
    "title":"Google Cloud Functions Deploy"})
    .then(data=>{
        if(data && data !== ("" || " ")){
            config.bucket = data;
        }else{
            bucket;
        }
    });
    
        
    // Create a new instance of the Gcp class.
    const gcpClass = new Gcp();
    
    // Call the iniciate method of the Gcp class.

    await gcpClass.iniciate();
    

    vscode.window.withProgress({"location":{"viewId":"CloudGenerator"},"title":"Teste progress"},
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