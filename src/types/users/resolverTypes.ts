import { User } from "@prisma/client";
import { FileUpload } from "graphql-upload";

export interface GenericResolverResults {
    ok: boolean,
    error?: string;
    
}

// seeProfile

export interface SeeProfileArgs {
    userName: string
}

// unfollowUser

export interface UnfollowUserArgs {
    userName: string
}

// seeFollowing

export interface SeeFollowingArgs {
    userName: string,
    lastId: number
}

export interface SeeFollowingResults {
    ok: boolean,
    following?: User[],
    error?: string
}

// seeFollowers 

export interface SeeFollowersArgs {
    userName: string,
    page: number
}

export interface SeeFollowersResults {
    ok: boolean,
    followers?: User[],
    totalPages?: number,
    error?: string
}

// searchUsers

export interface SearchUsersArgs {
    userName: string,
    lastId: number
}

// login

export interface LoginArgs {
    userName: string,
    password: string
}

export interface LoginResults {
    ok: boolean,
    token?: string,
    error?: string
}

// followUser

export interface FollowUserArgs {
    userName: string
}

// editProfile

export interface EditProfileArgs {
    firstName: string,
    lastName: string,
    userName: string,
    email: string,
    password: string,
    bio: string,
    avatar: FileUpload,
}

// createAccount

export interface CreateAccountArgs {
    firstName: string,
    lastName: string,
    userName: string,
    email: string,
    password: string
}

// computed fields

// photos

export interface ComputedFieldsRoot {
    id: number
}

export interface PhotosArgs {
    lastId: number
}