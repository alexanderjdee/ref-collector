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
  // Deletes the ref with the given id
  deleteRef: function(id) {
    return axios.delete("/api/refs/" + id);
  },
  // Saves a ref to the database
  saveRef: function(refData) {
    return axios.post("/api/refs", refData);
  }
};
