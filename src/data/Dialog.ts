import Message from './Message';
import Account from './Account';
import { makeObservable, observable } from "mobx";

export default class Dialog {
    @observable public draftText: string | null;
    @observable public lastReadMessageId: number;
    constructor(public id: number,
                public interlocutors: Account[],
                public messages: Message[],
                public name?: string,
                public pictureSrc?: string,
                lastReadMessageId: number = 0,
                draftText: string = "") {
        this.lastReadMessageId = lastReadMessageId >= 0 ? lastReadMessageId : messages[messages.length - 1].id;
        this.draftText = draftText;
        makeObservable(this);
    }
    public get isDirect(): boolean {
        return this.interlocutors.length <= 2 && this.name === undefined && this.pictureSrc === undefined;
    }

    public get lastMessageDateTime(): Date | null {
        const messagesCount = this.messages.length;
        if(messagesCount === 0) {
            return null;
        }
        else {
            return this.messages[messagesCount - 1].dateTime;
        }
    }
}

