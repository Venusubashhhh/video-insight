import axios from "axios";
import UPLOAD_PHOTO from "../../constants";
import { Filename } from "../../atom/FilenameAtom";

class playvideo {

  async play(data) {
    console.log('hello')
    try {
      const response = await  fetch(`http://192.168.1.124:8000/?video_name=${data}`)
      console.log(response);
 
    } catch (e) {
      console.log(e);
    }
  }
  async live()
  {
    console.log('hello')
    try {
      const response = await  fetch(`http://192.168.1.124:8000/live`)
      console.log(response);
 
    } catch (e) {
      console.log(e);
    }
  }

}

const VideoPlay = new playvideo();

export default VideoPlay;