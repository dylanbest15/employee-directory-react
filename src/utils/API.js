import axios from "axios";

export default {
  getEmployees: function() {
    return new Promise ((resolve, reject) => {
      axios
      .get("https://randomuser.me/api/?results=200&nat=us")
      .then(res => {
        resolve(res.data);
      }).catch(err => reject(err));
    })
  }
}