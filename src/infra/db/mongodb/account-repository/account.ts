import { AccountModel } from '../../../../domain/models/account';
import { AddAccountModel } from '../../../../domain/useCases/add-account';
import { AddAccountRepository } from '../../.././../data/protocols/add-account-repository'
import { MongoHelper } from "../helpers/mongo-helper";


const uri = process.env.MONGO_URL || 'mongodb://localhost:27017/clean-node-api'
const mongoHelper = new MongoHelper(uri)

export class AccountMongoRepository implements AddAccountRepository {

    async add(accountData: AddAccountModel): Promise<AccountModel> {
        const accountCollection = mongoHelper.getCollection('accounts')
        await accountCollection.insertOne(accountData)
        const insertedDocument = await accountCollection.findOne({ email: accountData.email })
        const { _id, ...accountWithoutId } = insertedDocument
        return Object.assign({}, accountWithoutId, { id: _id })
    }
}