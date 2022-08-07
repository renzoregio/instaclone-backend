// utils

import { User } from "@prisma/client"

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

export interface RootIsMyPhoto {
    userId: number
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

// seePhotoComments

export interface SeePhotoCommentsArgs {
    id: number,
    lastId: number
}

export interface SeePhotoCommentsResults {
    id: number,
    userId: number,
    payload: string,
    user: User
}