// computed fields

export default interface RootIsMyComment {
    userId: number
}

// deleteComment

export interface DeleteCommentArgs {
    id: number
}

// editComment

export interface EditCommentArgs {
    id: number,
    newPayload: string
}