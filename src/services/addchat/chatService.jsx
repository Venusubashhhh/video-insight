import axios from "axios";

class displayChat {
  async get(data) {
    try {
      const response = await axios.post(`http://192.168.1.124:8000/askGemini`, {
        prompt: "The team consists of four members. Karthi, Venu and Manju are members led by captain Sudharshan",
        question: data
      });
      return response.data; // Return response data instead of logging it
    } catch (e) {
      console.log(e);
    }
  }
}

const DisplayChat = new displayChat();

export default DisplayChat;

