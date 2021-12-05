import { DateTimeDisplayFormat, formatDate } from "../util/dateUtil";
import { Comment } from "../types/comments";

export type CommentsViewData = {
    issueKey: string;
    comments: {
        updated: string;
        content: any;
        createdUser: Comment["createdUser"];
    }[];
}[];

export const convertViewData = (
    fetchData:
        | {
              comments: Comment[];
              issueKey: string;
          }[]
        | undefined
) => {
    if (!fetchData) {
        return [];
    }
    return fetchData.map((item) => ({
        ...item,
        comments: item.comments.map((comment) => {
            return {
                updated: formatDate(
                    comment.updated,
                    DateTimeDisplayFormat.YYYYMMDDddJa,
                    { fromFormat: "YYYY-MM-DDTHH:mm:ssZ" }
                ),
                content: comment.content,
                createdUser: comment.createdUser,
            };
        }),
    }));
};
