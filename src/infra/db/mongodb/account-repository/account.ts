import { AccountModel } from '../../../../domain/models/account';
import { AddAccountModel } from '../../../../domain/useCases/add-account';
import { AddAccountRepository } from '../../../../data/protocols/db/add-account-repository'
import { MongoHelper } from "../helpers/mongo-helper";
import { LoadAccountByEmailRepository } from '../../../../data/protocols/db/load-account-by-email.repository';

export class AccountMongoRepository implements AddAccountRepository, LoadAccountByEmailRepository {

    async loadByEmail(email: string): Promise<AccountModel | null> {
        const accountCollection = await MongoHelper.getCollection('accounts')
        const account = await accountCollection.findOne({ email })
        if (account) {
            return MongoHelper.map(account)
        }
        return null
    }

    async add(accountData: AddAccountModel): Promise<AccountModel> {
        const accountCollection = await MongoHelper.getCollection('accounts')
        const result = await accountCollection.insertOne(accountData)
        const insertedDocument = await accountCollection.findOne({ _id: result.insertedId })
        return MongoHelper.map(insertedDocument)
    }
}