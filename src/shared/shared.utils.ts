import * as AWS from 'aws-sdk';

AWS.config.update({
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY,
        secretAccessKey: process.env.AWS_SECRET
    }
})



export const uploadPhoto = async (file, userId) => {
    const { filename, createReadStream  } = await file;  
    const readStream = await createReadStream();
    const objName = `${userId}-${Date.now()}-${filename}`
    const { Location } = await new AWS.S3().upload({
        Bucket: "instaclone-uploads-rr",
        Key: objName,
        ACL: "public-read",
        Body: readStream
    }).promise()

    return Location;
}   