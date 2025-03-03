// 共通エラー処理クラス
export class HttpException extends Error {}

// 400 BadRequest
export class BadRequestException extends HttpException {}

// 403 Forbidden
export class ForbiddenException extends HttpException {}

// 404 NotFound
export class NotFoundException extends HttpException {}

// 409 Conflict
export class ConflictException extends HttpException {}
