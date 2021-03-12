import { Storage } from "@google-cloud/storage";
import sharp from "sharp";
import imagemin from "imagemin";
import imageminMozjpeg from "imagemin-mozjpeg";

const storage = new Storage({
  keyFilename: "./serviceAccountKey.json",
  projectId: "telerank-e9b37",
});

const bucket = storage.bucket("telerank-e9b37.appspot.com");

/* Upload an image to a Google Cloud Storage bucket, by default it will resize and optimize the image before uploading it.
 * Returns the public url
 */
export async function uploadImage(
  path: string,
  optimize = true
): Promise<string | undefined> {
  try {
    if (optimize) {
      // Resize with sharp
      const width = 400;
      const height = 400;
      const buffer = await sharp(path).resize(width, height).jpeg().toBuffer();
      await sharp(buffer).toFile(path);

      // Optimize with imagemin/mozjpeg
      await imagemin([path], {
        plugins: [imageminMozjpeg({ quality: 80 })],
        destination: "./",
      });
    }

    // Upload file
    const uploadResults = await bucket.upload(path, { gzip: true });

    // Return public url
    return uploadResults[0].publicUrl();
  } catch (err) {
    console.log(err);
    return undefined;
  }
}

// Lists all buckets in the current project
export async function listBuckets() {
  try {
    const [buckets] = await storage.getBuckets();
    console.log("Buckets:");
    buckets.forEach((b) => {
      console.log(b.name);
    });
  } catch (err) {
    console.log(err);
  }
}
