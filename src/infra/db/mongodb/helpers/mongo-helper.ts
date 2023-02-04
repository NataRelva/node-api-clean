import { MongoClient, Collection } from "mongodb";

export default {
    client: null as unknown as MongoClient,
    connect(uri: string): Promise<void> {
        this.client = new MongoClient(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        return this.client.connect();
    },
    close(): Promise<void> {
        return this.client.close();
    },
    getCollection(name: string): Collection {
        return this.client.db().collection(name);
    }
}