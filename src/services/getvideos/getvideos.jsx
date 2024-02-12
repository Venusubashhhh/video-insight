
class getvideo {

  async get() {
    console.log('hello')
    try {
      const response = await  fetch(`http://192.168.1.124:8000/videos`)
      return response.json();
 
    } catch (e) {
      console.log(e);
    }
  }
}

const GetVideos = new getvideo();

export default GetVideos;