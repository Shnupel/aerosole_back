export default interface RequestTyped<T = any> extends Express.Request {
  body: T
}
