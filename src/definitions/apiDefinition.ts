/*
 * backlog api について
 *  https://developer.nulab.com/ja/docs/backlog/#backlog-api-%E3%81%A8%E3%81%AF
 */
const env = process.env;

/* slack setting */
export const slackApiBaseUrl = "https://slack.com/api/chat.postMessage";
export const slackApiToken = env.SLACK_ACCESS_TOKEN;
export const targetChannel = "test_channel"; /* remove「#」from channel name */

/* backlog setting */
const projectId = "PROJECT_ID";
/* 対象期間 */
export const NEAREST_DAY = 1;
export const ONE_WEEK = 7;
export const ONE_MONTH = 30;
export const ONE_YEAR = 365;
/* 1回のissue最大取得件数 */
export const LIMIT_ISSUE_COUNT = 5;
/* コメント情報取得APIを叩くかどうかの閾値 */
/* 短時間に叩きすぎると429errorで叩けなくなるので、小さめの値に設定する */
export const REQUEST_COMMENTS_THRESHOLD = 1;

export const backlogBaseUrl = "https://itvision.backlog.jp";

export const apiDef = {
    issues: () => `/api/v2/issues`,
    comments: (issueIdOrKey: string) =>
        `/api/v2/issues/${issueIdOrKey}/comments`,
};

export const defaultApiParams = {
    apiKey: env.BACKLOG_API_KEY,
};

export const statusType = {
    outstanding: "1" /* 未対応 */,
    processing: "2" /* 処理中 */,
    processed: "3" /* 処理済み */,
    closed: "4" /* 完了 */,
} as const;

export const termDef = {
    alert: "1",
    warning: "2",
    danger: "3",
} as const;

export const termDefList = [
    termDef.alert,
    termDef.warning,
    termDef.danger,
] as const;

export const titleDef = {
    [termDef.alert]: `*${NEAREST_DAY}日～1週間以内で返信していないチケットです！*`,
    [termDef.warning]: "*1週間以上返信していないチケットです！*",
    [termDef.danger]: "*1カ月以上返信していないチケットです！*",
};

export const stampList = [
    ":stamp1:",
    ":stamp2:",
    ":stamp3:",
    ":stamp4:",
    ":stamp5:",
];
