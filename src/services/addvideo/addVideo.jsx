import axios from "axios";
import UPLOAD_PHOTO from "../../constants";

class AddVideoData {
  apipath = UPLOAD_PHOTO;

  async Add(data) {
    console.log('hello')
    try {
      const response = await axios.post(`http://192.168.1.124:8000/uploadVideo`, data);
      console.log(response);
      console.log('bye');
    } catch (e) {
      console.log(e);
    }
  }
}

const AddVideo = new AddVideoData();

export default AddVideo;