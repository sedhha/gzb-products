export default class FirebaseLikeError extends Error {
  code: string;

  constructor(message: string, { code }: { code: string }) {
    super(message);
    this.code = code;
  }
}
