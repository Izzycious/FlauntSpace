import { NextApiHandler } from "next";
import { getXataClient } from "../../src/xata.codegen";

const handler = async (req, res) => {
  const xata = await getXataClient();
  const { link, post } = req.body;
  await xata.db.clients.create({
    post,
    link,
  });
  res.end();
  //   console.log(record);
};
export default handler;
