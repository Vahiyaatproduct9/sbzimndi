import React from "react";
import { Message } from "../types/types";
// import path from "./path";
export default class {
  public openConnection;
  public closeConnection;
  constructor(props: { conversation_id: string; state: React.Dispatch<React.SetStateAction<Message[] | null | undefined>> }) {
    // const wss = new WebSocket(`ws://localhost:9000/?conversation_id=${props.conversation_id}`);
    const wss = new WebSocket(`wss://sbzimndi.onrender.com/?conversation_id=${props.conversation_id}`);
    this.openConnection = async function () {

      wss.onopen = () => {
        console.log('WebSocket Client Connected');
      };
      wss.onmessage = async (message) => {
        console.log('message :', message)
        const fetch_data: {
          success: boolean;
          error?: string | null;
          message?: string | null;
          data: Message | null
        } = await JSON.parse(message.data);
        const mainChatLogObject: Message | null = fetch_data.data
        console.log('mainChatLogObject: ', mainChatLogObject)
        if (mainChatLogObject) {
          console.log('websocket data: ', mainChatLogObject)
          props.state(prev => prev ? [...prev, mainChatLogObject] : [mainChatLogObject])
        }
      }

      wss.onclose = () => {
        console.log('WebSocket Client Disconnected')
        return { closed: true }
      };
    }
    this.closeConnection = async function () {
      wss.close()
    }
  }
}
