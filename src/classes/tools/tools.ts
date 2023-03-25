// Import all interfaces needed
import {CloudFunctionResponse,FunctionDeploy,CreateFunction} from "../../interfaces/interfaces";

// Require the modules used
const util = require('node:util');
const exec = util.promisify(require('node:child_process').exec);




class System{

    async execSystemCommand(command:string):Promise<string>{
        
        const { stdout, stderr } = await exec(command);
        
        if (stdout){return stdout;}
        else{throw new Error(stderr);};
        
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
        
        let {stderr,stdout} = await exec(`Test-Path -Path ${path} ${ file ? "-PathType Leaf" : " "}`,{shell:"powershell.exe"});


        // If there was an error executing the command, throw an error.
        if (stderr) {throw new Error("Could not execute the command to verify the path");}
        
        if (stdout.trim() === "False"){return false;}

        if (stdout.trim() === "True"){return true;}

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
    async createCloudFunction(config:CreateFunction){

            // Checks if folder exists
            const pathExists = await this.systemClient.checkPath(config.projectPath);

            // If not return an error
            if (pathExists === false){throw new Error("The given folder does not exist.");}
            
            const zipFile:string = await this.systemClient.zipFolder(config.projectPath+"\\*.*","testeZip",config.projectPath).then(data => data);
            
    
            // Upload content in Cloud Storage
    
            //const bucketName = process.env
    
            //const storagePath = `gs://${bucketName}`;
    
            //await this.systemClient.execSystemCommand(`gsutil cp ${zipFile} ${storagePath}}`);
    
    
            // Exclude Zip 


            
            let deployFlags = [];

            if (config.instanceConfig){
    
                if (config.instanceConfig?.memory){
                    deployFlags.push(" --memory="+config.instanceConfig?.memory)
                }
                if(config.instanceConfig.securityLevel){
                    deployFlags.push(" --security-level="+config.instanceConfig.securityLevel)
                }
                if (config.instanceConfig.timeout){
                    // Second genearation of cloud functions allows timout time limit in 3600 seconds
                    
                    
                    if(config.generation === "GEN2"){

                        if (config.instanceConfig.timeout >= 3600){
                            throw new Error("Generation 2 timout limit is 3600 seconds, and it gave "+config.instanceConfig.timeout+" seconds." )
                        }
                        deployFlags.push(" --timeout= "+config.instanceConfig.timeout)
                    }
                    else if (config.instanceConfig.timeout <= 540){
                        deployFlags.push(" --timeout= "+config.instanceConfig.timeout)
                    }else {
                        throw new Error("Generation 1 timout limit is 540 seconds, and it gave "+config.instanceConfig.timeout+" seconds." )
                    }
                    
                     
                    

                    // First generation allows only 540
                    

                }

            }
            console.log(deployFlags);

            
            // Create function
            //await this.cloudFunctionDeploy({functionName:"Teste",entryPoint:"teste",region:"teste",runtime:"teste",trigger:"http",source:"teste"});
        
        


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
    * @description This function creates or update a cloud function in GCP using flags and CLI commands to it
     */
    private async cloudFunctionDeploy(config:FunctionDeploy){
        
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



        if (config)


        return new Promise ( async ()=>{

            // Execute the command in CLI
            await this.systemClient.execSystemCommand(defaultCommand)
            .then(()=>{
                return {url: `https://${config.region}-${this.projectId}.cloudfunctions.net/${config.functionName}`};
            })
            .catch((err)=>{
                console.log("Error with function deploy",err);
                throw new Error("Error building the function\nError: "+err);
            });
        });

    }








}

export {Gcp,System};