/* eslint-disable lines-between-class-members */

export class StatusError extends Error {
  static badRequest(message: string | undefined) {
    return new StatusError(400, message || 'badRequest');
  }
  static unauthorized(message: string | undefined) {
    return new StatusError(401, message || 'unAuthorizedAccess');
  }
  static forbidden(message: string | undefined) {
    return new StatusError(403, message || 'forbidden');
  }
  static notFound(message: string | undefined) {
    return new StatusError(404, message || 'notFound');
  }
  static serverError(message: string | undefined) {
    return new StatusError(500, message || 'serverError');
  }
  static badGateway(message: string | undefined) {
    return new StatusError(502, message || 'badGateWay');
  }
  statusCode: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  constructor(code: number, message: string) {
    super(message);
    this.statusCode = code;
  }
}
