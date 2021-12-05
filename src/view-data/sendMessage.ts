import _ from "lodash";
import {
    backlogBaseUrl,
    titleDef,
    stampList,
    termDef,
} from "../definitions/apiDefinition";
import { valueof } from "../util/typeUtil";
export const convertToSendMessage = (
    userIssueInfo: any | undefined,
    termKey: valueof<typeof termDef>
) => {
    const message = assembleMessage(userIssueInfo, termKey);
    return message;
};

export const mergeIssuesAndCommentsData = (
    issuesViewData: any,
    commentsData: any
) => {
    return issuesViewData.map((item) => {
        const targetComments =
            commentsData?.find(
                (comment) => comment.issueKey === item.issueKey
            ) ??
            {}; /* 閾値を超えた場合はリクエストしないため該当のデータがない場合がある */
        return {
            ...item,
            ...targetComments /* issueKeyが上書きされるが、同じものを取得しているので問題ない */,
        };
    });
};

/* 期間の違いで注意、警告、危険のアイコンの出し分けをする */
const assembleMessage = (
    userIssueInfo: any | undefined,
    termKey: valueof<typeof termDef>
) => {
    return userIssueInfo
        ? [
              getTitle(titleDef[termKey]),
              ...userIssueInfo.flatMap((content) => {
                  return getContent(content);
              }),
          ]
        : [];
};

export const getHeader = () => {
    return [
        {
            type: "section",
            text: {
                type: "mrkdwn",
                text: `Backlog Watcher`,
            },
        },
    ];
};

export const getUserCall = (userId: string) => {
    return [
        {
            type: "section",
            text: {
                type: "mrkdwn",
                text: `<@${userId}> さん宛の ${
                    stampList[Math.floor(Math.random() * stampList.length)]
                } です`,
            },
        },
    ];
};

const getTitle = (message: string) => {
    return {
        type: "section",
        text: {
            type: "mrkdwn",
            text: message,
        },
    };
};

const getContent = (content: { [key in string]: any }) => {
    return [
        {
            type: "section",
            text: {
                type: "mrkdwn",
                text: `
				<${backlogBaseUrl}/view/${content.issueKey}|${content.summary}>
				`,
            },
        }
    ];
};
