import { action, computed, observable, ObservableMap, IObservableArray, get, set, makeObservable } from 'mobx';
import Account from "../data/Account";
import RootStore from "./RootStore";

export default class AccountsStore {
    readonly multiAccount: Account;
    private readonly unknownAccount: Account;
    @observable private selected: Account;
    @observable private readonly accounts: IObservableArray<Account>;
    @observable private readonly allAccounts: ObservableMap<number, Account>;

    constructor(private readonly rootStore: RootStore) {
        makeObservable(this);
        this.multiAccount = new Account(0, 'Multi-account');
        this.unknownAccount = new Account(-1, 'Unknown Account');
        this.selected = this.multiAccount;
        this.accounts = observable([ // temporary
            new Account(1, 'First Username', 'https://i.imgur.com/sicII7N.jpg', ['tech', 'it', 'programming', 'VC']),
            new Account(2, 'Second Username', 'https://i.imgur.com/3tgjufY.jpg', ['music', 'rock', 'rap']),
            new Account(3, 'Third Username', 'https://i.imgur.com/WfdkN3o.jpg', ['church', 'God', 'Lucifer', 'prayer'])
        ]);
        this.allAccounts = observable.map();
        this.accounts.forEach(account => this.allAccounts.set(account.id, account));
        this.addAccountToAll(new Account(4, 'Interlocutor 1', 'https://i.imgur.com/CFpa3nK.jpg'));
        this.addAccountToAll(new Account(5, 'Interlocutor 2', 'https://i.imgur.com/fgrfeVu.jpg'));
    }

    @action private addAccountToAll(account: Account): void {
        set(this.allAccounts, account.id, account);
    }

    @action getAccountById(id: number): Account {
        return get(this.allAccounts, id) ?? this.unknownAccount;
    }

    @computed get userAccounts(): Account[] {
        return this.accounts;
    }

    @action addAccount(username: string, imageUrl: string): void {
        this.accounts.push(new Account(this.accounts[this.accounts.length - 1].id, username, imageUrl));
    }

    @computed get selectedAccount(): Account {
        return this.selected;
    }

    @action selectAccount(id: number): void {
        this.selected = this.accounts.find(account => account.id === id) ?? this.multiAccount;
    }

    @action deleteAccountTag(id: number, tagText: string): void{
        let index = this.accounts.findIndex(acc=>acc.id===id);

        let tagIndex = this.accounts[index].tags.findIndex(tag=>tag===tagText);
        if (-1 < tagIndex) {
            this.accounts[index].tags.splice(tagIndex, 1);
        }else{
            throw new Error("Such tag doesn't exists. tag text = "+tagText);
        }
    }

    @action deleteAccount(id:number):void{
        let index = this.accounts.findIndex(acc=>acc.id===id);
        if(-1<index){
            this.accounts.splice(index, 1);
        }
    }

    @action addNewTag(id:number, tagText:string):boolean{
        let indexAcc = this.accounts.findIndex(acc=>acc.id===id);
        this.accounts[indexAcc].tags.push(tagText);
        return true;
    }
}
