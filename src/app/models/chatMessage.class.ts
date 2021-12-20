export class chatMessage {
    messageText;
    sentBy;
    timeStamp;

    constructor(message, name, timeStamp?) {
        this.messageText = message;
        this.sentBy = name;
        if (timeStamp) {
            this.timeStamp = timeStamp;
        }
        else {
            this.timeStamp = this.getTime();
        }

    }

    getTime() {
        return +new Date();
    }

    public toJSON() {
        return {
            messageText: this.messageText,
            sentBy: this.sentBy,
            timeStamp: this.timeStamp
        }
    }

    getHours() {
        let date = new Date(this.timeStamp);
        return date.getHours();
    }

    getMinutes() {
        let date = new Date(this.timeStamp);
        return (date.getMinutes() < 10? '0' : '') + date.getMinutes();
    }
}