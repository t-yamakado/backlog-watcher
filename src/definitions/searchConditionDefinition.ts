import {
    allIdList,
    salesIdList,
    coreMemberIdList,
    debugIdList,
} from "./userDefinition";
import { statusType } from "./apiDefinition";
export const issuesPreset = {
    all: {
        idList: allIdList,
        statusList: [
            statusType.outstanding,
            statusType.processing,
            statusType.processed,
        ],
    },
    sales: {
        idList: salesIdList,
        statusList: [
            statusType.outstanding,
            statusType.processing,
            statusType.processed,
        ],
    },
    core: {
        idList: coreMemberIdList,
        statusList: [
            statusType.outstanding,
            statusType.processing,
            statusType.processed,
        ],
    },
    debug: {
        idList: debugIdList,
        statusList: [
            statusType.outstanding,
            statusType.processing,
            statusType.processed,
        ],
    },
} as const;

export type IssuesPreset = typeof issuesPreset;
export type IssuesKeys = keyof typeof issuesPreset;
