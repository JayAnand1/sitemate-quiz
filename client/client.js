const axios = require("axios");
const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const serverUrl = "http://localhost:3000"; // Replace with the URL of your server

function createData() {
  rl.question("Enter data to create: ", (data) => {
    const issue = JSON.parse(data);
    const obj = { issue: issue };
    axios
      .put(`${serverUrl}/create`, obj)
      .then((response) => {
        console.log("Data created successfully.");
        console.log(response.data);
        prompt();
      })
      .catch((error) => {
        console.error("Error creating data:", error.response.data.message);
        prompt();
      });
  });
}

function readData() {
  rl.question("Enter ID of data to read: ", (id) => {
    axios
      .get(`${serverUrl}/read?id=${id}`)
      .then((response) => {
        console.log("Data retrieved successfully:");
        console.log(response.data);
        prompt();
      })
      .catch((error) => {
        console.error("Error retrieving data:", error.response.data.message);
        prompt();
      });
  });
}

function updateData() {
  rl.question("Enter updated data: ", (data) => {
    const issue = JSON.parse(data);
    const obj = { issue: issue };
    axios
      .post(`${serverUrl}/update/`, obj)
      .then((response) => {
        console.log("Data updated successfully.");
        console.log(response.data);
        prompt();
      })
      .catch((error) => {
        console.error("Error updating data:", error.response.data.message);
        prompt();
      });
  });
}

function deleteData() {
  rl.question("Enter ID of data to delete: ", (id) => {
    axios
      .delete(`${serverUrl}/delete?id=${id}`)
      .then(() => {
        console.log("Data deleted successfully.");
        prompt();
      })
      .catch((error) => {
        console.error("Error deleting data:", error.response.data.message);
        prompt();
      });
  });
}

function prompt() {
  try {
    rl.question(
      "What do you want to do? (create/read/update/delete): ",
      (answer) => {
        switch (answer.toLowerCase()) {
          case "create":
            createData();
            break;
          case "read":
            readData();
            break;
          case "update":
            updateData();
            break;
          case "delete":
            deleteData();
            break;
          default:
            console.log(
              "Invalid input. Please enter one of the following options: create, read, update, delete"
            );
            rl.close();
            break;
        }
      }
    );
  } catch (err) {
    console.log("Error trying to make command:", err);
  }
}

prompt();
