export const mongoConfig = () => {
  return process.env.MONGO_DATABASE +
    "://" +
    process.env.MONGO_SERVER +
    ":" +
    process.env.MONGO_PORT +
    "/" +
    process.env.DATABASE_NAME
}
