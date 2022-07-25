const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const multer = require('multer');
const sharp = require('sharp')
// const image=require("./uploads")

   
/*------------------------------------------
--------------------------------------------
parse application/json
--------------------------------------------
--------------------------------------------*/
app.use(bodyParser.json());
  
/*------------------------------------------
--------------------------------------------
image upload code using multer
--------------------------------------------
--------------------------------------------*/
var storage = multer.diskStorage({
   destination: function (req, file, cb) {
      cb(null, 'uploads');
   },
   filename: function (req, file, cb) {
      cb(null, Date.now() + '-' + file.originalname);
   }
});
var upload = multer({ storage: storage });
   
/**
 * Create New Item
 *
 * @return response()
 */
app.post('/api/image-upload', upload.single('image'),(req, res) => {
  const image = req.image;
    res.send(apiResponse({message: 'File uploaded successfully.', image}));
});
  

// const image=uploads(req,res)
/**
 * API Response
 *
 * @return response()
 */
function apiResponse(results){
    return JSON.stringify({"status": 200, "error": null, "response": results});
}
  
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
/*------------------------------------------
--------------------------------------------
Server listening
--------------------------------------------
--------------------------------------------*/
app.listen(3002,() =>{
  console.log('Server started on port 3000...');
});