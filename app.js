const express = require("express")
const bodyParser = require("body-parser")
const request = require("request")
const https = require("https")

const app = express()

const port = 3000

//Uses
app.use(express.static("public"))
app.use(bodyParser.urlencoded({ extended: true }))

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/singup.html")
})

app.post("/", function (req, res) {
  const firstName = req.body.firstName
  const lastName = req.body.lastName
  const email = req.body.email

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
  }

  const jsonData = JSON.stringify(data)
  const url = "https://us12.api.mailchimp.com/3.0/lists/a98e14f23d"

  const options = {
    method: "POST",
    auth: "anton1:9e20b1fe8159e08c443275e83debbd82-us12",
  }

  const request = https.request(url, options, function (response) {
    if (response.statusCode === 200) {
      res.sendFile(__dirname + "/success.html")
    } else {
      res.sendFile(__dirname + "/failure.html")
    }
  })

  request.write(jsonData)
  request.end()
})

app.post("/failure", function (req, res) {
  res.redirect("/")
})

app.post("/success", function (req, res) {
  res.redirect("/")
})

app.listen(port, function () {
  console.log(`Server runing on port ${port}`)
})

//9e20b1fe8159e08c443275e83debbd82-us12
//a98e14f23d
