import * as AWS from 'aws-sdk';
import { FileUpload } from 'graphql-upload';

AWS.config.update({
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY,
        secretAccessKey: process.env.AWS_SECRET
    }
})



export const uploadToS3 = async (file: FileUpload, userId: number, folderName: string) : Promise<string> => {
    const { filename, createReadStream  } = await file;  
    const readStream = await createReadStream();
    const objName = `${folderName}/${userId}-${Date.now()}-${filename}`
    const { Location } = await new AWS.S3().upload({
        Bucket: "instaclone-uploads-rr",
        Key: objName,
        ACL: "public-read",
        Body: readStream
    }).promise()

    return Location;
}   