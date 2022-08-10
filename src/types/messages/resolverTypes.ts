// sendMessage

export interface SendMessageArgs {
    payload: string,
    roomId?: number
    userId?: number
}

// seeRooms 

export interface SeeRoomsArgs {
    lastId: number
}