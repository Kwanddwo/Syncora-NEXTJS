import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL;
const GET_INBOX_API = `${API_URL}/api/inbox/my-Inbox`;
const MARK_READ_API = `${API_URL}/api/inbox/mark-read`;
const MARK_UNREAD_API = `${API_URL}/api/inbox/mark-unread`;
// const VIEW_INBOX_DETAIL_API = `${API_URL}/api/inbox/view-details`;

export const getUserInboxAPI = async () => {
  const token = localStorage.getItem("token");
  const response = await axios.post(
    GET_INBOX_API,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

export const markAsReadAPI = async (inboxId: string) => {
  const token = localStorage.getItem("token");
  const response = await axios.post(
    MARK_READ_API,
    {
      inboxId,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response;
};

export const markAsUnreadAPI = async (inboxId: string) => {
  const token = localStorage.getItem("token");
  const response = await axios.post(
    MARK_UNREAD_API,
    {
      inboxId,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response;
};

export const markAllAsReadAPI = async () => {
  const token = localStorage.getItem("token");
  const response = await axios.post(
    `${API_URL}/api/inbox/mark-all-read`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response;
};

// export const viewInboxDetailAPI = async (inboxId: string) => {
//   const token = localStorage.getItem("token");
//   const response = await axios.post(
//     VIEW_INBOX_DETAIL_API,
//     {
//       inboxId,
//     },
//     {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     }
//   );
//   return response;
// };
