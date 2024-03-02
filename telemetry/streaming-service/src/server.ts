import net from "net";
import { WebSocket, WebSocketServer } from "ws";

interface VehicleData {
  battery_temperature: number;
  timestamp: number;
}

const TCP_PORT = 12000;
const WS_PORT = 8080;
const tcpServer = net.createServer();
const websocketServer = new WebSocketServer({ port: WS_PORT });

let numExceedsRange: number = 0;
let firstOutOfRange: number = 0;
let outOfRange: number = 0;

function checkTemp(jsonData: VehicleData) {
  if (jsonData.battery_temperature < 20 || jsonData.battery_temperature > 80) {
    outOfRange = jsonData.timestamp;
    if (numExceedsRange === 0) {
      firstOutOfRange = outOfRange;
    }

    if (outOfRange - firstOutOfRange > 5000) {
      if (numExceedsRange > 3) {
        console.log(
          "Unsafe temperature detected! The temperature exceeds range from: " +
            firstOutOfRange +
            " to " +
            outOfRange +
            ", which Occurs " +
            numExceedsRange +
            " times."
        );
      }
      numExceedsRange = 1;
      firstOutOfRange = outOfRange;
    } else {
      numExceedsRange++;
    }
  }
}

tcpServer.on("connection", (socket) => {
  console.log("TCP client connected");

  socket.on("data", (msg) => {
    console.log(`Received: ${msg.toString()}`);

    try {
      const jsonData: VehicleData = JSON.parse(msg.toString());
      checkTemp(jsonData);
    } catch (error) {
      return console.error("Error! unexpected message formation");
    }
    // Send JSON over WS to frontend clients
    websocketServer.clients.forEach(function each(client) {
      if (client.readyState === WebSocket.OPEN) {
        client.send(msg.toString());
      }
    });
  });

  socket.on("end", () => {
    console.log("Closing connection with the TCP client");
  });

  socket.on("error", (err) => {
    console.log("TCP client error: ", err);
  });
});

websocketServer.on("listening", () =>
  console.log(`Websocket server started on port ${WS_PORT}`)
);

websocketServer.on("connection", async (ws: WebSocket) => {
  console.log("Frontend websocket client connected");
  ws.on("error", console.error);
});

tcpServer.listen(TCP_PORT, () => {
  console.log(`TCP server listening on port ${TCP_PORT}`);
});
