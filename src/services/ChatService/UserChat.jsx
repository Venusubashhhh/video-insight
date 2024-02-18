import axios from "axios";
import UPLOAD_PHOTO from "../../constants";
import { apiBase } from "../../contant/api";

class UserChat {
  async get(data) {
    try {
      const response = await axios.post(`${apiBase}/askGemini`, {
        prompt:
          "The team consists of four members. Karthi, Venu and Manju are members led by captain Sudharshan",
        question: data,
      });
      return response.data; // Return response data instead of logging it
    } catch (e) {
      console.log(e);
    }
  }

  apipath = UPLOAD_PHOTO;

  async Add(data) {
    console.log("hello");
    try {
      const response = await axios.post(
        `${apiBase}/upload/photo`,
        data
      );
      console.log(response);
      console.log("bye");
      return response
    } catch (e) {
      console.log(e);
    }
  }
}

const userChat = new UserChat();

export default userChat;
