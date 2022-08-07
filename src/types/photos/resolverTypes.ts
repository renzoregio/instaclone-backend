// utils

export interface ProcessCaptionHashtagsResults {
    where: { hashtag : string },
    create: { hashtag : string }
}

// computed fields interfaces

export interface RootUser {
    userId: number
}

export interface RootHashtags {
    id: number
}

export interface RootLikes {
    id: number
}

export interface RootComments {
    id: number
}


// uploadPhoto interfaces 

export interface UploadPhotoArgs {
    file: string,
    caption: string
}

// seePhoto interfaces

export interface SeePhotoArgs {
    id: number
}

// searchPhotos

export interface SearchPhotosArgs {
    keyword: string,
    lastId?: number
}

// editPhoto

export interface EditPhotoArgs {
    photoId: number,
    newCaption: string
}



// toggleLike

export interface ToggleLikeArgs {
    photoId: number
}

// seePhotoLikes

export interface SeePhotoLikesArgs {
    photoId: number
}