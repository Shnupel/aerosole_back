export default interface RequestTyped<BodyTypes = any, ParamsTypes = any> extends Express.Request {
  body: BodyTypes,
  params: any,
  headers: any
}
