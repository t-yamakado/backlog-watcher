/*
 * プロジェクトのuser一覧取得
 * GET https://itvision.backlog.jp/api/v2/projects/<project_id>/users?apiKey=<apiKey>
 * Content-Type: application/json
 *
 * {}
 */
export const userNameToIdMapping = {
    test: "0000000000"
} as const;

export const idToUserNameMapping = {
    [userNameToIdMapping.test]: "test"
} as const;

export const idToSlackUserIdMapping = {
    [userNameToIdMapping.test]: "DUMMY_ID",
} as const;

export const allIdList = Object.keys(userNameToIdMapping).map(
    (key) => userNameToIdMapping[key as keyof typeof userNameToIdMapping]
);

export const salesIdList = [userNameToIdMapping.test];

export const coreMemberIdList = [userNameToIdMapping.test];

export const debugIdList = [userNameToIdMapping.test];
