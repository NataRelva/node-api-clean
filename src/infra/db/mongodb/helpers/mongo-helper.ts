import { MongoClient, Collection } from "mongodb";

export interface DbHelper {
    connect(): Promise<void>
    close(): Promise<void>
}

export class MongoHelper implements DbHelper {

    private client: MongoClient
    constructor(
        private readonly uri: string
    ) {
        this.client = new MongoClient(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
    }

    async connect(): Promise<void> {
        this.client.connect()
    }

    async close(): Promise<void> {
        await this.client.close()
    }

    getCollection(name: string): Collection {
        return this.client.db().collection(name)
    }
}