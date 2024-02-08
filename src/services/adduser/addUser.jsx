import axios from "axios";
import UPLOAD_PHOTO from "../../constants";

class AddUserData {
  apipath = UPLOAD_PHOTO;

  async Add(data) {
    console.log('hello')
    try {
      const response = await axios.post(`http://192.168.1.124:8000/upload/photo`, data);
      console.log(response);
      console.log('bye')
     
    } catch (e) {
      console.log(e);
    }
  }
}

const AddUser = new AddUserData();

export default AddUser;