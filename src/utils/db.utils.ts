import mongoose from "npm:mongoose";

export const ConnectDB = async () => {
  try {
    const conn = await mongoose.connect(Deno.env.get("MONGO_URI")!);
    console.log(`connected ${conn.connection.host}`);
  } catch (error) {
    console.log(error);
    Deno.exit(0);
  }
};
