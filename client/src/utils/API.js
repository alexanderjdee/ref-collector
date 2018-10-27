import axios from "axios";

export default {
  // Gets all refs
  getRefs: function() {
    return axios.get("/api/refs");
  },
  // Gets the ref with the given id
  getRef: function(id) {
    return axios.get("/api/refs/" + id);
  },
  //Search refs that contain given string in title
  searchRefs: function(searchData) {
    var search = searchData.search;
    return axios.get("/api/search/" + search);
  },
  // Deletes the ref with the given id
  deleteRef: function(id) {
    return axios.delete("/api/refs/" + id);
  },
  // Saves a ref to the database
  saveRef: function(refData) {
    return axios.post("/api/refs", refData);
  },
  signUp: function(signUpData) {
    return axios.post("/api/account/signup", signUpData);
  },
  signIn: function(signInData) {
    return axios.post("/api/account/signin", signInData);
  },
  getUserID: function(tokenId) {
    return axios.get("api/account/usersession/" + tokenId);
  },
  updateUser: function (userId, body) {
    return axios.put("/api/users/" + userId, body);
  },
  getUserRefs: function(userId) {
    return axios.get("/api/users/" + userId);
  }
};
