import { AccountModel } from '../../../../domain/models/account';
import { AddAccountModel } from '../../../../domain/useCases/add-account';
import { AddAccountRepository } from '../../.././../data/protocols/add-account-repository'
import { MongoHelper } from "../helpers/mongo-helper";

export class AccountMongoRepository implements AddAccountRepository {

    async add(accountData: AddAccountModel): Promise<AccountModel> {
        const accountCollection = await MongoHelper.getCollection('accounts')
        const result = await accountCollection.insertOne(accountData)
        const insertedDocument = await accountCollection.findOne({ _id: result.insertedId })
        const { _id, ...accountWithoutId } = insertedDocument
        return Object.assign({}, accountWithoutId, { id: _id })
    }
}