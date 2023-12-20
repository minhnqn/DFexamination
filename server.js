const express = require("express"),
  app = express(),
  bodyParser = require("body-parser");
port = process.env.PORT || 5555;
app.listen(port);
const fs = require("fs");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var routes = require("./src/appRouter");
routes(app);

//// MQTT
const mqtt = require("mqtt");

const clientId = `mqtt_${Math.random().toString(16).slice(3)}`;

const client = mqtt.connect({
  clientId,
  protocol: "mqtt",
  host: "a3lafbeca71eu5-ats.iot.ap-southeast-1.amazonaws.com",
  port: 8883,
  clean: true,
  connectTimeout: 4000,
  reconnectPeriod: 1000,
  rejectUnauthorized: true,
  ca: [fs.readFileSync("./config/root_ca.pem")],
  key: fs.readFileSync("./config/private_key.key"),
  cert: fs.readFileSync("./config/certificate.crt"),
});

const topic = "back-end-exam";

client.on("connect", () => {
  console.log("Connected");
  client.subscribe(topic, (err) => {
    if (!err) {
      client.publish(topic, "Hello word");
    }
  });
});

client.on("message", (topic, message) => {
  console.log(`Received message: ${message}`);
  client.end();
});

client.on('error', (error) => {
  console.error('Failed MQTT', error);
});

