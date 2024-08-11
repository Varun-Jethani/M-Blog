import conf from "../conf/conf";
import { Client, ID, Databases, Storage, Query } from "appwrite";

export class Service {

    client = new Client();
    databases;
    bucket;

    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);
        this.databases = new Databases(this.client);
        this.bucket = new Storage(this.client);
    }

    async createPost({title,slug, content, featuredImage, status, userId}) {
        try {
            console.log(conf.appwriteDatabaseId)
            return await this.databases.createDocument(conf.appwriteDatabaseId, conf.appwriteCollectionId, slug, {
                title,
                content,
                featuredImage,
                status,
                userid: userId
            });
        } catch (error) {
            console.log("Appwrite :: createPost :: error", error);
        }
    }

    async updatePost(slug, {title, content, featuredImage, status}) {
        try {
            return await this.databases.updateDocument(conf.appwriteDatabaseId, conf.appwriteCollectionId, slug, {
                title,
                content,
                featuredImage,
                status
            });
        } catch (error) {
            throw error;
        }
    }
    async deletePost(slug) {
        try {
            return await this.databases.deleteDocument(conf.appwriteDatabaseId, conf.appwriteCollectionId, slug);
        } catch (error) {
            throw error;
        }
    }

    async getPost(slug) {
        try {
            return await this.databases.getDocument(conf.appwriteDatabaseId, conf.appwriteCollectionId, slug);
        } catch (error) {
            throw error;
        }

    }

    async getPosts(queries=[Query.equal('status', 'active')]) {
        queries.push(Query.orderDesc())
        try {
            return await this.databases.listDocuments(conf.appwriteDatabaseId, conf.appwriteCollectionId, queries);
        } catch (error) {
            throw error;
        }
    }

    //file upload service

    async uploadFile(file) {
        try {
            return await this.bucket.createFile(
                conf.appwriteBucketId,
                ID.unique(),
                file
            );
        } catch (error) {
            throw error;
        }
    }
    async deleteFile(fileId) {
        try {
            return await this.bucket.deleteFile(conf.appwriteBucketId, fileId);
        } catch (error) {
            throw error;
        }
    }

    getFilePreview(fileId) {
        try {
            return this.bucket.getFilePreview(conf.appwriteBucketId, fileId);
        } catch (error) {
            throw error;
        }
    }


}

const service = new Service();
export default service;