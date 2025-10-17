"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const uptime_module_1 = require("./uptime.module");
async function bootstrap() {
    const app = await core_1.NestFactory.create(uptime_module_1.AppModule);
    app.enableCors({
        origin: '*',
    });
    await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
//# sourceMappingURL=main.js.map