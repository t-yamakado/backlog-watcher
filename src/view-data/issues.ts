import { ONE_WEEK, ONE_MONTH, termDef } from "../definitions/apiDefinition";
import {
    DateTimeDisplayFormat,
    formatDate,
    diffInDays,
    getCurrentDate,
} from "../util/dateUtil";
import { Issue } from "../types/issues";

export type IssuesViewData = {
    issueKey: string;
    assigneeInfo: {
        id: number;
        name: string;
    };
    summary: string;
    priorityInfo: {
        id: number;
        name: string;
    };
    dueDate: string;
    updatedInfo: {
        termKey: string;
        dateKey: string;
        date: string;
        id: number;
        name: string;
    };
}[];

export const convertViewData = (fetchData: Issue[] | undefined) => {
    if (!fetchData) {
        return [];
    }
    return fetchData.map((task) => {
        return {
            issueKey: task.issueKey,
            assigneeInfo: {
                id: task.assignee.id,
                name: task.assignee.name,
            },
            summary: task.summary,
            priorityInfo: {
                id: task.priority.id,
                name: task.priority.name,
            },
            dueDate: formatDate(
                task.dueDate,
                DateTimeDisplayFormat.YYYYMMDDddJa,
                { fromFormat: "YYYY-MM-DDTHH:mm:ssZ" }
            ),
            updatedInfo: {
                termKey: getTermId(
                    formatDate(task.updated, DateTimeDisplayFormat.YYYYMMDDHy, {
                        fromFormat: "YYYY-MM-DDTHH:mm:ssZ",
                    })
                ),
                dateKey: formatDate(
                    task.updated,
                    DateTimeDisplayFormat.YYYYMMDDHy,
                    { fromFormat: "YYYY-MM-DDTHH:mm:ssZ" }
                ),
                date: formatDate(
                    task.updated,
                    DateTimeDisplayFormat.YYYYMMDDddJa,
                    { fromFormat: "YYYY-MM-DDTHH:mm:ssZ" }
                ),
                id: task.updatedUser.id,
                name: task.updatedUser.name,
            },
        };
    });
};

const getTermId = (targetDate: string) => {
    const dateFromCurrentDate = diffInDays(
        getCurrentDate(DateTimeDisplayFormat.YYYYMMDDHy),
        targetDate
    );
    return dateFromCurrentDate < ONE_WEEK
        ? termDef.alert
        : dateFromCurrentDate < ONE_MONTH
        ? termDef.warning
        : termDef.danger;
};
