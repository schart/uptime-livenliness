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
exports.InfluxService = void 0;
const common_1 = require("@nestjs/common");
const influxdb_client_1 = require("@influxdata/influxdb-client");
const config_1 = require("@nestjs/config");
let InfluxService = class InfluxService {
    config;
    influx;
    writeApi;
    queryApi;
    constructor(config) {
        this.config = config;
        this.influx = new influxdb_client_1.InfluxDB({
            url: this.config.get('INFLUX_URL'),
            token: this.config.get('INFLUX_TOKEN'),
        });
        this.writeApi = this.influx.getWriteApi(this.config.get('INFLUX_ORG'), this.config.get('INFLUX_BUCKET'));
        this.queryApi = this.influx.getQueryApi(this.config.get('INFLUX_ORG'));
    }
    async writeCheck(data) {
        const point = new influxdb_client_1.Point('site-status')
            .tag('host', data.host)
            .stringField('status', data.status)
            .stringField('lastUpdate', data.lastUpdate);
        this.writeApi.writePoint(point);
        await this.writeApi.flush();
    }
    async getHostStatus(host) {
        const query = `
      from(bucket: "uptime")
        |> range(start: -10m)
        |> filter(fn: (r) => r._measurement == "site-status" and r.host == "${host}")
        // |> last()
    `;
        const data = await this.queryApi.collectRows(query);
        return data[0] || null;
    }
};
exports.InfluxService = InfluxService;
exports.InfluxService = InfluxService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], InfluxService);
//# sourceMappingURL=uptime.influx.service.js.map