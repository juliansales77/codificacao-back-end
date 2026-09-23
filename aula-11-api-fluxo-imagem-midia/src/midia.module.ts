import { Module,Controller } from "@nestjs/common";
import { MidiaController } from "./midia.controller.js";

@Module({
    controllers: [MidiaController]
})
export class MidiaModule{}