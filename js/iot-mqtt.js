var clientId = "ws" + Math.random(); //Dirección aleatoria

// Create a client instance
var client = new Paho.MQTT.Client("190.110.108.59", 8083, clientId);

// set callback handlers
client.onConnectionLost = onConnectionLost;
client.onMessageArrived = onMessageArrived;

// connect the client
client.connect({ onSuccess: onConnect });

// called when the client connects
function onConnect() {
  // Once a connection has been made, make a subscription and send a message.
  console.log("Conectado MQTT-WebSocket");
  client.subscribe("Temp");
  client.subscribe("Relay");
  /*message = new Paho.MQTT.Message("Hello");
  message.destinationName = "World";
  client.send(message);*/
}

// called when the client loses its connection
function onConnectionLost(responseObject) {
  if (responseObject.errorCode !== 0) {
    console.log("Conexión Perdida. Error:" + responseObject.errorMessage);
  }
}

// called when a message arrives
function onMessageArrived(message) {
  console.log(message.destinationName + ": " + message.payloadString);
  if (message.destinationName == 'Temp') {
    document.getElementById("ValorTemp").textContent = message.payloadString;
  }

  if (message.destinationName == 'Relay') {
    document.getElementById("ValorRelay").textContent = message.payloadString;
  }
}