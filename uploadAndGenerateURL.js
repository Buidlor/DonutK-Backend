const cloudinary = require("./config/cloudinary.js");

const uploadAndGenerateURL = async (imageURL, publicID, width, height, crop) => {
    try {
        const uploadResult = await cloudinary.uploader.upload(imageURL, {public_id: publicID});
        console.log("uploadResult: ", uploadResult);

        const generatedURL = cloudinary.url(publicID, {
            width: width,
            height: height,
            crop: crop,
        });
        console.log("generatedURL: ", generatedURL);
        return generatedURL;
    } catch (error) {
        console.log("error: ", error);
    }   
}

// const imageURL = "https://tse1.explicit.bing.net/th?id=OIP.H0lvjFSrZcZjnUMk7kSaKgHaLJ";
// const publicID = "kitten";
// const width = 200;
// const height = 200;
// const crop = "fill";

// uploadAndGenerateURL(imageURL, publicID, width, height, crop);

module.exports = uploadAndGenerateURL;