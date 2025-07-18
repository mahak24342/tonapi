
import axios from "axios";

const API = axios.create({
  baseURL: "https://tonapi.io/v2",
  headers: {
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_TON_API_KEY}`,
  },
});

export async function getAccountInfo(addr: string) {
  const res = await API.get(`/accounts/${addr}`);
  return res.data;
}

export async function getAccountEvents(addr: string) {
  const res = await API.get(`/accounts/${addr}/events?limit=10`);
  return res.data.events;
}
