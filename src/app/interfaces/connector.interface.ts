export interface HTTPConnector {
  apiUrl: string;
  username: string;
  password: string;
  topic: string;
}


export interface MQTTConnector {
  brokerUrl: string;
  username: string;
  password: string;
  topic: string;
}
