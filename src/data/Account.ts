export default class Account {
    constructor(public id: number,
                public username: string,
                public imageUrl: string = '/images/icon.png',
                public tags: string[] = []) {
    }
}
