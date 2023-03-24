// Import all interfaces needed
import {CloudFunctionResponse,FunctionDeploy} from "../../interfaces/interfaces";

// Require the modules used
const util = require('node:util');
const exec = util.promisify(require('node:child_process').exec);




class System{

    async execSystemCommand(command:string):Promise<string>{
        
        const { stdout, stderr } = await exec(command);
        
        if (stdout){
            console.log(stdout);
            return stdout;
        }else{
            console.log(stderr);
            throw new Error(stderr);
        };
        
    }
    
    async postRequest(url:string,authorization?:string) {
        
        let command = `curl -X POST ${url}`;

        if (authorization){
            command = `curl -X POST  -H "Authorization: Bearer ${authorization}" ${url}`;
        }
        
        const { stdout, stderr } = await exec(command);

        if (stdout){
            return stdout;
        }else{
            console.log(stderr);
            return stderr; 
        };
    }

    /**
     * This function takes a folder path, zip file name, and folder destination, and compresses the folder into a zip file
     * @param folderpath - The path to the folder to be compressed
     * @param zipName - The name of the zip file to be created
     * @param folderDestination - The path to the folder where the zip file should be saved
     * @returns A promise that resolves to the name of the zip file if successful, or an error message if unsuccessful
     * 
     * TODO: CONFIG zipFolder TO LINUX AND MAC
     */
    async zipFolder(folderpath:string,zipName:string,folderDestination:string):Promise<any> {

        // Execute the command
        const { stderr }  = await exec(`Compress-Archive -Path ${folderpath} -DestinationPath ${folderDestination}/${zipName}.zip`,{shell:"powershell.exe"});

        if (stderr){
            return stderr;
        }

        return `${folderDestination}/${zipName}.zip` ;

    }

    /**
     * Asynchronously checks whether a given path exists.
     * @param path - The path to check.
     * @param file - Optional boolean indicating whether the path should be checked as a file.
     * @returns true if the path exists and is a file (if file=true) or if it exists and is a directory (if file=false), false otherwise.
     * @throws Error if the command to verify the path cannot be executed.
     */
    async checkPath(path:string,file?:boolean){

        // Use the Node.js `exec` function to execute the PowerShell command `Test-Path` to verify the existence of the path.
        // If `file` is true, use the `-PathType Leaf` flag to verify that the path is a file.
        // Otherwise, do not pass any flag to verify that the path is a directory.
        let {stderr,stdout} = await exec(`Test-Path -Path ${path} ${ file ? "-PathType Leaf" : " "}`);
        
        // If there was an error executing the command, throw an error.
        if (stderr) {
            throw new Error("Could not execute the command to verify the path");
        }

        
        if (stdout === "False"){return false;}
        if (stdout === "True"){return true;}

    }


}

class Gcp{
    public projectId: string = "";
    
    public account:string = "";
    
    private systemClient = new System; 

    constructor(project?:string,account?:string){
        if (project){this.projectId = project;}
        if(account){this.account;};
    }

    // Set the class 'project' and 'account' varibles with current GCP project and account configurated in GCLOUD Enviroment 
    async iniciate(){
        
        try{
            this.projectId = await this.systemClient.execSystemCommand('gcloud config get project');
    
            this.account = await this.systemClient.execSystemCommand('gcloud config get account');        
        }catch(err) {

            console.log(err);

        }

    }

    /**
     * This function changes the current project ID for the gcloud CLI by executing a system command
     * @param newProjectId - The new project ID to set
     */
    async changeProjectId(newProjectId:string){

        // Construct the command to set the project ID using the gcloud CLI
        let command = `gcloud config set project ${newProjectId}`;   
        
        // Execute the command using the 'execSystemCommand' function and handle the result with a promise
        await new System().execSystemCommand(command).then(()=>{
            // If the command is successful, log a message and update the project ID
            console.log("Updated gcloud project for: "+newProjectId);
            this.projectId = newProjectId;
        // If the command fails, log an empty message
        }).catch(()=>{
            console.log("");
            throw new Error("Error with change of project Id");
        });
    }



    // Create cloud function deploy
    /** 
     * @param folderpath: The path to the folder to be deployed
     * @param config.functionName: Name of the new cloud function;
     * @param config.runtime: The language to run the cloud function 
     * @param config.entryPoint: The entrypoint of function
     * @param config.trigger: Choose the trigger method of function = "http" | "event" 
     * @param config.region: Region where the function will be hosted (Default us-central1)
     * 
     * @description This function create and deploy a new cloud function on current gcp project.
     * Note that if you to update a function, utilize the cloudFunctionUpdate.
     * This function utilizes Google Cloud Storage to 
     *
    */
    async createCloudFunction(folderPath:string , config:{}){
      

        try {
            // Checks if folder exists
            const pathExists = await this.systemClient.checkPath(folderPath);

            // If not return an error
            if (pathExists === false){throw new Error("The given folder does not exist.");}

            
            const zipFile:string = await this.systemClient.zipFolder(folderPath+"\\*.*","testeZip","D:\\projects").then(data => data);
            
    
            // Upload content in Cloud Storage
    
            const bucketName = process.env;
    
            const storagePath = `gs://${bucketName}`;
    
            await this.systemClient.execSystemCommand(`gsutil cp ${zipFile} ${storagePath}}`);
    
    
            // Exclude Zip 
    
            // Create function
            await this.cloudFunctionDeploy({functionName:"Teste",entryPoint:"teste",region:"teste",runtime:"teste",trigger:"http",source:"teste"});
        }catch(err){
            return err;
        }

    } 

    /**
     *@param functionName As the its name suggests, it's the name of of the function
    * @param source The Cloud Storage Path (ex: gs://bucketName/file.zip)
    * @param running The language function is running
    * @param entryPoint The main function to be called when the function is triggered
    * @param region Region where you want to host the function
    * @param trigger Trigger method function is using 
    * @param memory The memory allocated to function
    * @param varibles The enviroment varibles the function is using
    * @param flags Flags you may want to add to new cloud function 
    *  
    * @returns url The new function url | <CloudFunctionResponse>
    * 
    * 
    * @description This function creates or update a cloud function in GCP using flags and CLI commands to it
    */
    private async cloudFunctionDeploy(config:FunctionDeploy):Promise <CloudFunctionResponse> {
        
        // Command to be executed by gcloud CLI
        let defaultCommand = `gcloud functions deploy ${config.functionName} 
        --runtime=${config.runtime} 
        --source=${config.source}
        --stage-bucket=${config.source}
        --entry-point=${config.entryPoint} 
        --region=${config.region}
        `;

        // Adding adicional flags to defaultCommand
        if(config.flags){for (let flag of config.flags){defaultCommand+` ${flag}`;}}

        // Get trigger type
        if (config.trigger === "http"){ defaultCommand+" --trigger-http";}

        return new Promise ( async ()=>{

            // Execute the command in CLI
            await this.systemClient.execSystemCommand(defaultCommand).then(()=>{
                return {url: `https://${config.region}-${this.projectId}.cloudfunctions.net/${config.functionName}`};
            })
            .catch((err)=>{
                console.log("Error with function deploy");
                throw new Error("Error building the function\nError: "+err);
            });
        });

    }








}

export {Gcp,System};