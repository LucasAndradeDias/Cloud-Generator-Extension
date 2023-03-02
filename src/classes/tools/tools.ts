const { spawn } = require('node:child_process');
const { exec } = require('node:child_process');
import * as vscode from 'vscode';


function getGcpInfo(){


}


class Gcp{
    public projectId:string = "";
    public account:string = "";


    constructor(project:string,account:string){
        this.projectId = project;
        this.account = account;

    }

    async changeProjectId(newProjectId:string){
        await exec(`gcloud config set project ${newProjectId}`);
        this.projectId = newProjectId;
    }


    async getGcpInfos(){
        exec("gcloud config get project",(error:any,stdout:any, stderr:any)=>{if(error){return error;}
        this.projectId = stdout;});
    }
    

    async makeDeploy(){

        exec("")
    };




}

export {Gcp}