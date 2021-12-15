export class Channel {
    name: string;
    level: number;
    description: string;
    userIdList: [];
    createdBy: string;

    constructor(obj?: any) {
        this.name = obj ? obj.name : '';
        this.level = 2;
        this.description = obj ? obj.description : '';
        this.userIdList = obj ? obj.userIdList : '';
        this.createdBy = obj ? obj.createdBy : '';
    }

    public toJSON() {
        return {
            name: this.name,
            level: this.level,
            description: this.description,
            userIdList: this.userIdList,
            createdBy: this.createdBy
        }
    }
}