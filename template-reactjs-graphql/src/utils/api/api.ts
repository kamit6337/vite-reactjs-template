import axios from "axios";
import environment from "../environment";
import catchAsyncError from "@/lib/catchAsyncError";

const BASE_URL = environment.SERVER_URL;

export const getReq = catchAsyncError(async (url: string, params?: object) => {
  const token = "";

  const get = await axios.get(`${BASE_URL}${url}`, {
    params,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return get?.data;
});

export const postReq = catchAsyncError(async (url: string, body: object) => {
  const token = "";

  const post = await axios.post(`${BASE_URL}${url}`, body, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return post?.data;
});

export const patchReq = catchAsyncError(async (url: string, body: object) => {
  const token = "";

  const patch = await axios.patch(`${BASE_URL}${url}`, body, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return patch?.data;
});

export const deleteReq = catchAsyncError(
  async (url: string, params: object) => {
    const token = "";

    const deleted = await axios.delete(`${BASE_URL}${url}`, {
      params,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return deleted?.data;
  }
);