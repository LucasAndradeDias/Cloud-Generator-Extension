/**
 * @param name [REQUIRE] As the its name suggests, it's the name of of the function
 * @param localPath [REQUIRE] The local path of the function in your machine
 * @param trigger [REQUIRE] Trigger method function is using 
 * @param runtime [REQUIRE] The language function is running
 * @param entryPoint [REQUIRE] The main function to be called when the function is triggered
 * @param region [REQUIRE] Region where you want to host the function 
 * @param storagePath The Cloud Storage Path (ex: gs://bucketName/file.zip)
 * @param varibles The enviroment varibles the function is using
 * @param genearation The cloud functions generation you want to use (GEN 2 or GEN 1-default)
 * @param flags Flags you might want to add in deploy of new cloud function
 * @param instanceConfig more advanced configurations of the Function | InstanceConfig interface
 * @param bucket The Cloud Storage Bucket the function should use.
 */
export interface Ifunction {
    name:string ,
    localPath:string,
    trigger:"http" | "event",
    runtime:string,
    entryPoint:string,
    region:Regions,
    storagePath?:string,
    varibles?:string[],
    generation?:Generation
    flags?:string | string[]
    instanceConfig?:InstanceConfig,
    bucket?:string

}

export interface InstanceConfig {
    memory?: "128MB" | "256MB" | "512MB" | "1024MB" | "2048MB" | "4096MB" | "8192MB",
    securityLevel?: "secure-always" | "secure-optional",
    timeout?:number
}

export enum Regions {

    "asia-east1",
    "asia-east2",
    "asia-northeast1",
    "asia-northeast2",
    "asia-northeast3",
    "asia-south1",
    "asia-south2",
    "asia-southeast1",
    "asia-southeast2",
    "australia-southeast1",
    "australia-southeast2",
    "europe-central2",
    "europe-north1",
    "europe-southwest1",
    "europe-west1",
    "europe-west12",
    "europe-west2",
    "europe-west3",
    "europe-west4",
    "europe-west6",
    "europe-west8",
    "europe-west9",
    "me-west-1",
    "northamerica-northeast1",
    "northamerica-northeast2",
    "southamerica-east1",
    "southamerica-west1",
    "us-central1",
    "us-east1",
    "us-east4",
    "us-east5",
    "us-south1",
    "us-west1",
    "us-west2",
    "us-west3",
    "us-west4"

}

export enum Generation{
    "GEN1",
    "GEN2"
}


export enum TriggerType{
    "Http" = " --trigger-http",
    "Pub/Sub event" = " --trigger-http",
    "Cloud Storage event" = " --trigger-http",
    "Firestore event" = " --trigger-http",
    "Google Analytics event" = " --trigger-http",
    "Firebase realtime database event" = " --trigger-http"

}



