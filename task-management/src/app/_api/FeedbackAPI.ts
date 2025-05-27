import axios from "axios";
const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL;
const FEEDBACK_API = `${API_URL}/api/feedback`;

import { Feedback } from "@/types";

export const feedbackAPI = async (feedback: Feedback) => {
  const token = localStorage.getItem("token");
  const response = await axios.post(
    FEEDBACK_API,
    {
      feedback,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};
