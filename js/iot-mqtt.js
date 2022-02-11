// Declaración de variables
var clientId = "ws"; //Dirección aleatoria
Temperatura = 0;

// Create a client instance
var client = new Paho.MQTT.Client("190.110.108.59", 8083, clientId);
//var EstadoRelay;

// Set callback handlers
client.onConnectionLost = onConnectionLost;
client.onMessageArrived = onMessageArrived;

// Connect the client
client.connect({ onSuccess: onConnect });

// Called when the client connects
function onConnect() {
  console.log("Conectado MQTT-WebSocket");
  client.subscribe("Temp");
  client.subscribe("Relay");
  /*message = new Paho.MQTT.Message("Hello");
  message.destinationName = "World";
  client.send(message);*/
}

// Called when the client loses its connection
function onConnectionLost(responseObject) {
  if (responseObject.errorCode !== 0) {
    console.log("Conexión Perdida. Error:" + responseObject.errorMessage);
  }
}

// Called when a message arrives
function onMessageArrived(message) {
  console.log(message.destinationName + ": " + message.payloadString);
  if (message.destinationName == 'Temp') {
    document.getElementById("ValorTemp").textContent = message.payloadString;
    Temperatura = parseFloat(message.payloadString);
  }

  if (message.destinationName == 'Relay') {
    document.getElementById("ValorRelay").textContent = message.payloadString;
    EstadoRelay = message.payloadString;
  }
}
/*
// Called when you want to change the Relay's state
function changeRelay() {
  if (EstadoRelay == 1) {
    client.send('Relay', 0);
  }
  if (EstadoRelay == 0) {
    client.send('Relay', 1);
  }
}*/