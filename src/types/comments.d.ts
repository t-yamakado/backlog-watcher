export interface Comment {
    id: number;
    content?: any;
    changeLog: ChangeLog[];
    createdUser: CreatedUser;
    created: string;
    updated: string;
    stars: any[];
    notifications: any[];
}

interface CreatedUser {
    id: number;
    userId?: any;
    name: string;
    roleType: number;
    lang?: any;
    mailAddress?: any;
    nulabAccount?: any;
    keyword: string;
}

interface ChangeLog {
    field: string;
    newValue: string;
    originalValue: string;
    attachmentInfo?: any;
    attributeInfo?: any;
    notificationInfo?: any;
}
