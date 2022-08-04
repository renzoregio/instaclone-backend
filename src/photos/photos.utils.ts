import { ProcessCaptionHashtagsResults } from "../types/photos/resolverTypes"

export default function processCaptionHashtags(caption : string) : ProcessCaptionHashtagsResults[] {
    const temp = caption.match(/#[\w]+/g)
    return temp ? temp.map(hashtag => ({ where: { hashtag }, create: { hashtag}})) : []
} 