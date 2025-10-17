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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UptimeService = void 0;
const common_1 = require("@nestjs/common");
const uptime_entity_1 = require("./uptime.entity");
const uptime_api_client_1 = require("./uptime.api.client");
const uptime_gateway_1 = require("./uptime.gateway");
let UptimeService = class UptimeService {
    gateway;
    logger = new common_1.Logger();
    constructor(gateway) {
        this.gateway = gateway;
    }
    getSites() {
        return {
            status: 200,
            content: uptime_entity_1.sites.map(({ host, status, lastUpdate }) => ({
                host,
                status,
                lastUpdate,
            })),
        };
    }
    async handeCron() {
        await Promise.all(uptime_entity_1.sites.map(async (site) => {
            try {
                await (0, uptime_api_client_1.apiClient)({
                    method: 'GET',
                    url: site.host,
                });
                site.status = 'UP';
                this.logger.debug(`UP: ${site.host}`);
            }
            catch (e) {
                site.status = 'DOWN';
                this.logger.error(`DOWN: ${site.host}`, e.stack);
            }
            finally {
                site.lastUpdate = new Date().toISOString();
                this.gateway.sendStatusUpdate(site);
            }
        }));
    }
};
exports.UptimeService = UptimeService;
exports.UptimeService = UptimeService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [uptime_gateway_1.UptimeGateway])
], UptimeService);
//# sourceMappingURL=uptime.service.js.map