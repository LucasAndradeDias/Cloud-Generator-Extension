
    
export interface CloudFunctionResponse {
    url:string,
}

    
/**
 * @param functionName As the its name suggests, it's the name of of the function
 * @param source The Cloud Storage Path (ex: gs://bucketName/file.zip)
 * @param running The language function is running
 * @param entryPoint The main function to be called when the function is triggered
 * @param region Region where you want to host the function
 * @param trigger Trigger method function is using 
 * @param memory The memory allocated to function
 * @param varibles The enviroment varibles the function is using
 * @param flags Flags you may want to add to new cloud function
 */
export interface FunctionDeploy {
    functionName:string,
    source:string,
    runtime:string,
    entryPoint:string,
    region:string,
    trigger:"http" | "event",
    varibles?:string | string[],
    flags?:string | string[]
}

export interface CreateFunction {
    functionName:string,
    projectPath:string,
    runtime:string,
    entryPoint:string,
    region:string,
    trigger:"http" | "event",
    varibles?:string[],
    instanceConfig?:AdvancedConfig,
    generation?:"GEN1" | "GEN2"
}


export interface AdvancedConfig {
    memory?: "128MB" | "256MB" | "512MB" | "1024MB" | "2048MB" | "4096MB" | "8192MB",
    securityLevel?: "secure-always" | "secure-optional",
    timeout?:number
}







