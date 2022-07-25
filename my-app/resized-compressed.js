const sharp = require("sharp");

async function compressedImg() {
  try {
    await sharp("./uploads/1658753963853-view.jpg")
      .resize({
        width: 150,
        height: 97
      })
    // .toFile("sammy-resized.png");
      .toFormat("jpeg", { mozjpeg: true })
      .toFile("./new-uploads/newimage.jpg");
  } catch (error) {
    console.log(error);
  } 
}

compressedImg();