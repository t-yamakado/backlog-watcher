export interface Issue {
    id: number;
    projectId: number;
    issueKey: string;
    keyId: number;
    issueType: IssueType;
    summary: string;
    description: string;
    resolution?: any;
    priority: Priority;
    status: IssueType;
    assignee: Assignee;
    category: Category[];
    versions: any[];
    milestone: Milestone[];
    startDate?: any;
    dueDate: string;
    estimatedHours?: any;
    actualHours?: any;
    parentIssueId?: any;
    createdUser: Assignee;
    created: string;
    updatedUser: Assignee;
    updated: string;
    customFields: CustomField[];
    attachments: any[];
    sharedFiles: any[];
    stars: any[];
}

interface CustomField {
    id: number;
    fieldTypeId: number;
    name: string;
    value?: Category[] | any[] | Category;
    otherValue?: any;
}

interface Milestone {
    id: number;
    projectId: number;
    name: string;
    description?: any;
    startDate?: any;
    releaseDueDate?: any;
    archived: boolean;
    displayOrder: number;
}

interface Category {
    id: number;
    name: string;
    displayOrder: number;
}

interface Assignee {
    id: number;
    userId?: any;
    name: string;
    roleType: number;
    lang?: any;
    mailAddress?: any;
    nulabAccount?: any;
    keyword: string;
}

interface Priority {
    id: number;
    name: string;
}

interface IssueType {
    id: number;
    projectId: number;
    name: string;
    color: string;
    displayOrder: number;
}
