import type { NextApiRequest, NextApiResponse } from "next";

type ResponseData = {
  message: string;
};

export default function handler(res: NextApiResponse<ResponseData>) {
  res.status(200).json({ message: "Hello from TypeScript API!" });
}
