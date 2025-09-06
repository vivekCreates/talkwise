import axios from "axios";


const api = axios.create({
  baseURL: "http://localhost:3000/api/v1/conversations",
});


export const createConversationApi = async (title:string) => {
  const response = await api.post("/create", { title });
  return response.data;
}

export const getAllConversationsApi = async () => {
  const response = await api.get("/all");
  return response.data;
}

export const getConversationApi = async (id:string) => {
  const response = await api.get(`/${id}`);
  return response.data;
}

export const deleteConversationApi = async (id:string) => {
  const response = await api.delete(`/${id}`);
  return response.data;
}
