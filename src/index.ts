import { fetchIssues, fetchComments } from "./fetchData";
import { sendToSlack } from "./sendMessage";
import { issuesPreset } from "./definitions/searchConditionDefinition";
import { convertViewData as convertViewDataIssues } from "./view-data/issues";
import { convertViewData as convertViewDataComments } from "./view-data/comments";

export const main = async () => {
    const issuesData = await fetchIssues(issuesPreset.debug);
    const issuesViewData = convertViewDataIssues(issuesData);
    const issueIdOrKeyList = issuesViewData.map((item) => item.issueKey);
    const commentsData = await fetchComments(issueIdOrKeyList);
    const commentsViewData = convertViewDataComments(commentsData);
    sendToSlack(issuesViewData, commentsViewData);
};

main();
