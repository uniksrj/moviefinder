import axios from "axios";


const api = axios.create({
  baseURL: "http://localhost:3001",
    headers: {
        "Content-Type": "application/json",
    },
});

export const getPosts = async () => {
    try {
        const response = await api.get("/posts");
        return response.data;
    } catch (error) {
        console.error("Error fetching posts:", error);
        throw error;
    }
};

export const savePostdata = async (data: any) => {
    try {
        const response = await api.post("/posts", data);
        return response.data;
    } catch (error) {
        console.error("Error saving post data:", error);
        throw error;
    }
}

export const deletePostdata = async (id: number | string) => {
    try {
      const response = await api.delete(`/posts/${id}`);
      return response;
    } catch (error) {
      console.error("Full error:", error);
      if (axios.isAxiosError(error) && error.response) {
        console.error("Server responded with:", error.response.status, error.response.data);
      }
      throw error;
    }
  }

