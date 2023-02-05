import { MongoClient, Collection } from "mongodb";

export const MongoHelper = {
    uri: null as unknown as string,
    client: null as unknown as MongoClient,
    async connect(uri: string): Promise<void> {
        this.uri = uri;
        this.client = new MongoClient(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        return await this.client.connect();
    },
    async close(): Promise<void> {
        await this.client.close();
    },
    async getCollection(name: string): Promise<Collection> {

        return this.client.db().collection(name);
    }
}