"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UptimeController = void 0;
const uptime_service_1 = require("./uptime.service");
const schedule_1 = require("@nestjs/schedule");
const common_1 = require("@nestjs/common");
const uptime_dto_1 = require("./uptime.dto");
let UptimeController = class UptimeController {
    uptimeService;
    constructor(uptimeService) {
        this.uptimeService = uptimeService;
    }
    getAll() {
        return this.uptimeService.getSites();
    }
    async getStatus(host) {
        return this.uptimeService.getStatus(host);
    }
    async addHost(body) {
        return this.uptimeService.addHost(body.host);
    }
    async handleCron() {
        this.uptimeService.handeCron();
    }
};
exports.UptimeController = UptimeController;
__decorate([
    (0, common_1.Get)('/'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Object)
], UptimeController.prototype, "getAll", null);
__decorate([
    (0, common_1.Get)(':host'),
    __param(0, (0, common_1.Param)('host')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UptimeController.prototype, "getStatus", null);
__decorate([
    (0, common_1.Post)('/add'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [uptime_dto_1.siteDto]),
    __metadata("design:returntype", Promise)
], UptimeController.prototype, "addHost", null);
__decorate([
    (0, schedule_1.Cron)(schedule_1.CronExpression.EVERY_5_SECONDS),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UptimeController.prototype, "handleCron", null);
exports.UptimeController = UptimeController = __decorate([
    (0, common_1.Controller)('site'),
    __metadata("design:paramtypes", [uptime_service_1.UptimeService])
], UptimeController);
//# sourceMappingURL=uptime.controller.js.map