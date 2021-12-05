import axios from "axios";
import _ from "lodash";
import qs from "qs";
import {
    slackApiBaseUrl,
    slackApiToken,
    targetChannel,
    termDefList,
} from "./definitions/apiDefinition";
import {
    userNameToIdMapping,
    idToSlackUserIdMapping,
} from "./definitions/userDefinition";
import { CommentsViewData } from "./view-data/comments";
import { IssuesViewData } from "./view-data/issues";
import {
    convertToSendMessage,
    getHeader,
    getUserCall,
    mergeIssuesAndCommentsData,
} from "./view-data/sendMessage";

export const sendToSlack = async (
    issuesViewData: IssuesViewData,
    commentsData: CommentsViewData
) => {
    /* botのheader情報 */
    const paramsForHeader = {
        token: slackApiToken!,
        channel: targetChannel,
        text: "",
        blocks: JSON.stringify(getHeader()),
    };
    await axios.post(`${slackApiBaseUrl}`, qs.stringify(paramsForHeader));

    const mergedData = mergeIssuesAndCommentsData(issuesViewData, commentsData);
    const groupByUserIdData = _(mergedData)
        .orderBy((item) => item.assigneeInfo.id)
        .groupBy((item) => item.assigneeInfo.id)
        .value();

    const userIdList = [userNameToIdMapping.test];
    const groupByDateDataList = userIdList.map((user) => {
        return {
            [user]: _(groupByUserIdData[user])
                .orderBy((item) => item.updatedInfo.dateKey)
                .groupBy((item) => item.updatedInfo.termKey)
                .value(),
        };
    });

    userIdList.forEach(async (key, idx) => {
        /* 通知したいuserをcallする */
        const paramsForUserCall = {
            token: slackApiToken!,
            channel: targetChannel,
            text: "",
            blocks: JSON.stringify(
                getUserCall(
                    idToSlackUserIdMapping[userNameToIdMapping.test]
                )
            ),
        };
        const res = await axios.post(
            `${slackApiBaseUrl}`,
            qs.stringify(paramsForUserCall)
        );
        const timeStamp = res.data.ts;
        /* user毎にスレッドに返信する */
        const userIssueInfo = groupByDateDataList[idx][key];
        /*
         * NOTE: スレッドのtimestampはすべて同じものを渡すが、処理を直列で実行するため通知順が担保される
         * NOTE: reduceを使うとasync/awaitを直列実行することができる
         * ref: https://qiita.com/yakisuzu/items/11bcea06f661ccc2528f
         */
        termDefList.reduce(async (prev, curr) => {
            await prev; /* 一つ前の値をawaitすることで処理を待つ */
            const message = convertToSendMessage(userIssueInfo[curr], curr);
            if (message.length > 0) {
                const paramsForThread = {
                    ...paramsForHeader,
                    blocks: JSON.stringify(message),
                    thread_ts: timeStamp,
                };
                await axios.post(
                    `${slackApiBaseUrl}`,
                    qs.stringify(paramsForThread)
                );
            }
        }, Promise.resolve());
    });
};
