import { Storage } from "@google-cloud/storage";
import sharp from "sharp";
import imagemin from "imagemin";
import imageminMozjpeg from "imagemin-mozjpeg";
import fs from "fs";
import { log, downloadImage } from "lib/Helpers";

sharp.cache(false);

// TODO: Move project id, bucket url, etc. to environment variables
const storage = new Storage({
  keyFilename: "./serviceAccountKey.json",
  projectId: "telerank-e9b37",
});

const bucket = storage.bucket("telerank-e9b37.appspot.com");

/*
 * Upload an image to a Google Cloud Storage bucket.
 * If the parameter overrideUploaded is false and the username's photo is already in the bucket, it will return the public url without uploading it again-
 * The photo will be uploaded as <username>.jpg
 * Returns the public url
 */
export async function uploadPhoto(
  photoUrl: string,
  username: string,
  overrideUploaded = false,
  optimize = true
): Promise<string | undefined> {
  if (!photoUrl || !username) return undefined;

  try {
    const PATH = `${username}.jpg`;

    if (!overrideUploaded) {
      const file = bucket.file(PATH);
      const exists = await file.exists();
      if (exists[0]) {
        const publicUrl = file.publicUrl();
        if (publicUrl) {
          return publicUrl;
        }
      }
    }

    await downloadImage(PATH, photoUrl);

    if (optimize) {
      // Resize with sharp
      const width = 400;
      const height = 400;
      const buffer = await sharp(PATH).resize(width, height).jpeg().toBuffer();
      await sharp(buffer).toFile(PATH);

      // Optimize with imagemin/mozjpeg
      await imagemin([PATH], {
        plugins: [imageminMozjpeg({ quality: 80 })],
        destination: "./",
      });
    }

    // Upload file
    const uploadResults = await bucket.upload(PATH, { gzip: true });

    // Delete local file
    fs.unlink(PATH, (err) => err && log.error(`Delete file failed: ${err}`));

    // Return public url
    return uploadResults[0].publicUrl();
  } catch (err) {
    log.error(err);
    return undefined;
  }
}

// Lists all buckets in the current project
export async function listBuckets() {
  try {
    const [buckets] = await storage.getBuckets();
    log.info("Buckets:");
    buckets.forEach((b) => {
      log.info(b.name);
    });
  } catch (err) {
    log.error(err);
  }
}
