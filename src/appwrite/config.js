import conf from "../conf/conf";
import {Client,ID,Database,Storage,Query} from "appwrite"

export class Service{
    client = new Client();
    database;
    bucket;

    constructor(){
        this.client
        .setEndpoint(conf.appwriteUrl)
        .setProject(conf.appwriteProjectId);
        this.database = new Database(this.client);
        this.bucket = new Storage(this.client);
    }

    async createPost({title,slug,content,featureImage,status,userId}){
        try{
            return await this.database.createDocument(
                conf.appwriteDatabaseId,
                slug,
                {
                    title,
                    content,
                    featureImage,
                    status,
                    userId,
                }
            )
        }catch(error){
            console.log("Appwrite service::getCurrentUser::error",error);
        }
    }

    async updatePost(slug, {title,content,featureImage,status}){
        try{
            return await this.database.updateDocument(
                conf.appwriteDatabaseId,
                slug,
                {
                    title,
                    content,
                    featureImage,
                    status,
                }
            )

        }catch(error){
            console.log("Appwrite service::getCurrentUser::error",error);
        }
    }

    async deletePost(slug){
        try{
            await this.database.deleteDocument(
                conf.appwriteDatabaseId,
                slug
            )
            return true;
        }catch(error){
            console.log("Appwrite service::getCurrentUser::error",error);
            return false;
        }
    }

    async getPost(slug){
        try{
            return await this.database.getDocument(
                conf.appwriteDatabaseId,
                slug
            )
        }catch(error){
            console.log("Appwrite service::getCurrentUser::error",error);
            return false;
        }
    }

    async getPosts(queries = [Query.equal("status","active")]){
        try{
            return await this.database.listDocuments(
                conf.appwriteDatabaseId,
                queries,
            )
        }catch(error){
            console.log("Appwrite service::getCurrentUser::error",error);
            return false;
        }
    }

    async uploadFile(file){
        try{
            return await this.bucket.createFile(
                conf.appwriteBucketId,
                ID.unique(),
                file
            )
        }catch(error){
            console.log("Appwrite service::getCurrentUser::error",error);
            return false;
        }
    }

    async deleteFile(fileId){
        try{
            await this.bucket.deleteFile(
                conf.appwriteBucketId,
                fileId
            )
            return true;
        }catch(error){
            console.log("Appwrite service::getCurrentUser::error",error);
            return false;
        }
    }

    getFilePreview(fileId){
        return this.bucket.getFilePreview(
            conf.appwriteBucketId,
            fileId
        )
    }
}

const service = new Service()

export default service;
