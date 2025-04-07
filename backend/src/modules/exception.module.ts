import { InternalServerErrorExceptionFilter } from '@/exception/internal-server-error-exception.filter';
import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';

@Module({
  providers: [
    { provide: APP_FILTER, useClass: InternalServerErrorExceptionFilter },
  ],
})
export class ExceptionModule {}
