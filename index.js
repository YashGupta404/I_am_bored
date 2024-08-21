import express from "express";
import bodyParser from "body-parser";
import axios from "axios";

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

// Step 1: Make sure that when a user visits the home page,
//   it shows a random activity.You will need to check the format of the
//   JSON data from response.data and edit the index.ejs file accordingly.
app.get("/", async (req, res) => {
  try {
    const response = await axios.get("https://bored-api.appbrewery.com/random");// this is how you get access to api using axios
    const result = response.data;// The data received from api
    res.render("index.ejs", { data: result });
    console.log(result);
  } catch (error) {
    console.error("Failed to make request:", error.message);
    res.render("index.ejs", {
      error: error.message,
    });// Handling error in axios
  }
});

app.post("/", async (req, res) => {
  console.log(req.body);// Remember we post req.body as client
  //const client_choice = req.body;
  // Step 2: Play around with the drop downs and see what gets logged.
  // Use axios to make an API request to the /filter endpoint. Making
  // sure you're passing both the type and participants queries.
  // Render the index.ejs file with a single *random* activity that comes back
  // from the API request.
  // Step 3: If you get a 404 error (resource not found) from the API request.
  // Pass an error to the index.ejs to tell the user:
  // "No activities that match your criteria."

  try {
    const client_response = await axios.get(`https://bored-api.appbrewery.com/filter?type=${req.body.type}&participants=${req.body.participants}`);
    console.log(client_response);
    const client_result = client_response.data;
    res.render("index.ejs", { data: client_result[Math.floor(Math.random() * client_result.length)] });
    console.log(client_result);
  } catch (error) {
    console.error("Failed to make request:", error.message);
    res.render("index.ejs", {
      error: error.message,
    });// Handling error in axios
  }
});


app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
