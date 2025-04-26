import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL;
const SEND_INVITE_API = `${API_URL}/api/invite/send`;
const ACCEPT_INVITE_API = `${API_URL}/api/invite/accept`;
const DECLINE_INVITE_API = `${API_URL}/api/invite/decline`;

export const sendInviteAPI = async (
  workspaceId: string,
  invitedUserId: string
) => {
  const token = localStorage.getItem("token");
  console.log("workspaceId", workspaceId);
  console.log("invitedUserId", invitedUserId);
  const response = await axios.post(
    SEND_INVITE_API,
    {
      workspaceId,
      invitedUserId,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

export const acceptInviteAPI = async (inviteId: string) => {
  const token = localStorage.getItem("token");
  const response = await axios.post(
    ACCEPT_INVITE_API,
    {
      inviteId,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response;
};

export const declineInviteAPI = async (inviteId: string) => {
  const token = localStorage.getItem("token");
  const response = await axios.post(
    DECLINE_INVITE_API,
    {
      inviteId,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response;
};
