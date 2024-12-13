import cloudinary from "../config/cloudinaryConfig.js"

const uploadToCloudinary = (file, role, id) => {
    return new Promise((resolve, reject) => {
      const uploadStream = cloudinary.v2.uploader.upload_stream(
        { resource_type: "auto", public_id: (role === "family" ? `family${id}_${Date.now()}` : `association${id}_${Date.now()}`) },
        (error, result) => {
          if (error) {
            reject(error);
          } else {
            resolve(result.secure_url);
          }
        }
      );
      uploadStream.end(file.buffer);
    });
};

export default uploadToCloudinary;