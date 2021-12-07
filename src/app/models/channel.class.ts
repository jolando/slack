export class Channel {
    name: string;
    description: string;
    userIdList: [];

    constructor(obj?: any) {
        this.name = obj ? obj.name : '';
        this.description = obj ? obj.description : '';
        this.userIdList = obj ? obj.userIdList : '';
    }

    public toJSON() {
        return {
            name: this.name,
            description: this.description,
            userIdList: this.userIdList,
        }
    }
}