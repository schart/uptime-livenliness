"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const uptime_controller_1 = require("./uptime.controller");
const uptime_service_1 = require("./uptime.service");
const schedule_1 = require("@nestjs/schedule");
const uptime_gateway_1 = require("./uptime.gateway");
const uptime_influx_service_1 = require("./uptime.influx.service");
const config_1 = require("@nestjs/config");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            schedule_1.ScheduleModule.forRoot(),
            config_1.ConfigModule.forRoot({
                envFilePath: '.env',
            }),
        ],
        controllers: [uptime_controller_1.UptimeController],
        providers: [uptime_service_1.UptimeService, uptime_gateway_1.UptimeGateway, uptime_influx_service_1.InfluxService],
    })
], AppModule);
//# sourceMappingURL=uptime.module.js.map