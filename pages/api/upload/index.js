import formidable from "formidable";
import cloudinary from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(request, response) {
  try {
    if (request.method !== "POST") {
      response.status(405).json({ message: "Method not allowed" });
      return;
    }

    const form = formidable({});

    const [fields, files] = await form.parse(request);

    const file = files.image[0];
    if (!file) {
      return response.status(400).json({ message: "No file uploaded" });
    }

    const result = await cloudinary.v2.uploader.upload(filepath, {
      public_id: newFilename,
      folder: "plants",
    });

    return response.status(200).json({
      url: result.secure_url,
      publicId: result.public_id,
      width: result.width,
      height: result.height,
    });
  } catch (error) {
    console.error(error);
    return response.status(500).json({ message: error.message });
  }
}
