const express = require("express");

const bodyParser = require("body-parser");

const https = require("https");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static("public"));

app.get("/", (req, res) => res.sendFile(__dirname + "/signup.html"));

app.post("/", (req, res) => {
  const firstName = req.body.first;
  const lastName = req.body.last;
  const email = req.body.emailAdd;

  const data = {
    members: [
      {
        email_address: email,
        status: "subscribed",
        merge_fields: {
          FNAME: firstName,
          LNAME: lastName,
        },
      },
    ],
  };

  const jsonData = JSON.stringify(data);

  const url = "https://us10.api.mailchimp.com/3.0/lists/932573d1e6";
  const options = {
    method: "POST",
    auth: "vk123:fee6a39803bb004cd3d17b508cc0a0b6-us10",
  };

  const r = https.request(url, options, (response) => {
    if (response.statusCode === 200) {
      res.sendFile(__dirname + "/success.html");
    } else {
      res.sendFile(__dirname + "/failure.html");
    }
    // res.on("data", (data) => {
    //   const mailchimpRes = console.log(JSON.parse(data));
    //   console.log(mailchimpRes.errors.error_code);
    // });
  });

  r.write(jsonData);
  r.end();
});

app.post("/failure", (req, res) => {
  res.redirect("/");
});
app.listen(8008, () => console.log("server is running on boob"));
