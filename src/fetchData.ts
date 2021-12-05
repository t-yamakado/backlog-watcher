import axios from "axios";
import {
    apiDef,
    backlogBaseUrl,
    defaultApiParams,
    LIMIT_ISSUE_COUNT,
    NEAREST_DAY,
    ONE_YEAR,
    REQUEST_COMMENTS_THRESHOLD,
} from "./definitions/apiDefinition";
import {
    IssuesKeys,
    IssuesPreset,
} from "./definitions/searchConditionDefinition";
import { userNameToIdMapping } from "./definitions/userDefinition";
import { Issue } from "./types/issues";
import {
    DateTimeDisplayFormat,
    dateToString,
    formatDate,
    subtractDays,
} from "./util/dateUtil";

export const fetchIssues = async (preset: IssuesPreset[IssuesKeys]) => {
    /* 暫定対応だが、割り当てチケットが多い人は単独でリクエストして拾い漏れが起きないようにする */
    const group1 = preset.idList.filter(
        (id) => id === userNameToIdMapping.test
    );
    const group2 = preset.idList.filter(
        (id) => id !== userNameToIdMapping.test
    );
    const queryStrList = [group1, group2].map((idGroup) => {
        /* 複数リクエストする場合は、同一key名でリクエストしないといけないため、あらかじめ文字列にして組み立てておく */
        const assigneeIdListStr = idGroup
            .map((user) => ["assigneeId[]", user].join("="))
            .join("&");
        const statusIdListStr = preset.statusList
            .map((id) => ["statusId[]", id].join("="))
            .join("&");

        const updatedFrom = formatDate(
            subtractDays(dateToString(new Date()), 3 * ONE_YEAR), // プロジェクトの初め頃に設定して全期間を表す
            DateTimeDisplayFormat.YYYYMMDDHy
        );
        const updatedTo = formatDate(
            subtractDays(dateToString(new Date()), NEAREST_DAY),
            DateTimeDisplayFormat.YYYYMMDDHy
        );

        const issueArrayParamStr = [assigneeIdListStr, statusIdListStr].join(
            "&"
        );
        /* 複数設定しなくてよいkey情報*/
        const issuesParams = {
            ...defaultApiParams,
            updatedSince: updatedFrom /* 更新日from */,
            updatedUntil: updatedTo /* 更新日to */,
            sort: "assignee",
            count: LIMIT_ISSUE_COUNT,
        };

        return [
            Object.keys(issuesParams)
                .map((key) =>
                    [key, issuesParams[key as keyof typeof issuesParams]].join(
                        "="
                    )
                )
                .join("&"),
            issueArrayParamStr,
        ].join("&");
    });

    try {
        const res = await axios.all(
            queryStrList.map((str) =>
                axios.get(`${backlogBaseUrl}${apiDef.issues()}?${str}`)
            )
        );
        return res.flatMap((apiRes: any) => apiRes.data) as Issue[];
    } catch (error) {
        if (error.response) {
            console.log(error.response.status);
            console.log(error.response.statusText);
            console.log(error.response.headers);
            console.log(error.response.data);
        }
    }
};

export const fetchComments = async (issueIdOrKeyList: string[] | undefined) => {
    if (!issueIdOrKeyList) {
        return undefined;
    }
    if (REQUEST_COMMENTS_THRESHOLD < issueIdOrKeyList.length) {
        console.log(
            `Cancel request to comments api. Threshold: ${REQUEST_COMMENTS_THRESHOLD}`
        );
        return undefined;
    }
    /* 複数設定しなくてよいkey情報*/
    const commentsParams = {
        ...defaultApiParams,
        count: 1 /* 最新のコメントだけ取ってくればいいので1 */,
        order: "desc",
    };

    const queryStr = Object.keys(commentsParams)
        .map((key) =>
            [key, commentsParams[key as keyof typeof commentsParams]].join("=")
        )
        .join("&");

    try {
        /* 得られたチケットリストに対するコメントを取得 */
        return Promise.all(
            issueIdOrKeyList.map((item) => {
                return axios
                    .get(
                        `${backlogBaseUrl}${apiDef.comments(item)}?${queryStr}`
                    )
                    .then((res) => {
                        return {
                            comments: res.data,
                            issueKey: item,
                        };
                    });
            })
        );
    } catch (error) {
        if (error.response) {
            console.log(error.response.status);
            console.log(error.response.statusText);
            console.log(error.response.headers);
            console.log(error.response.data);
        }
    }
};
