import { PipeTransform, ArgumentMetadata, BadRequestException } from "@nestjs/common";
import { z } from "zod";

export class ZodValidationPipe implements PipeTransform {
    constructor(private schema: z.ZodSchema) {}

    transform(value: unknown, metadata: ArgumentMetadata) {
        if (metadata.type !== 'body') return value;

        const parseResult = this.schema.safeParse(value);

        if (!parseResult.success) {
            const formattedError = parseResult.error.issues.map((issue) => ({
                campo: issue.path.join('.'),
                mensagem: issue.message,
            }));

            throw new BadRequestException({
                statusCode: 400,
                erros: formattedError,
            });
        }

        return parseResult.data;
    }
}