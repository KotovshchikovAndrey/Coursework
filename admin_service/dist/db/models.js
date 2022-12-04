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
exports.IngredientModel = exports.DonutModel = void 0;
const typeorm_1 = require("typeorm");
let DonutModel = class DonutModel {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], DonutModel.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 70, nullable: false }),
    __metadata("design:type", String)
], DonutModel.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], DonutModel.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'integer', nullable: false }),
    __metadata("design:type", Number)
], DonutModel.prototype, "price", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => IngredientModel, {
        cascade: false,
    }),
    (0, typeorm_1.JoinTable)(),
    __metadata("design:type", Array)
], DonutModel.prototype, "ingredients", void 0);
DonutModel = __decorate([
    (0, typeorm_1.Entity)()
], DonutModel);
exports.DonutModel = DonutModel;
let IngredientModel = class IngredientModel {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], IngredientModel.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 255, nullable: true, unique: true }),
    __metadata("design:type", String)
], IngredientModel.prototype, "image", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 50, nullable: false, unique: true }),
    __metadata("design:type", String)
], IngredientModel.prototype, "name", void 0);
IngredientModel = __decorate([
    (0, typeorm_1.Entity)()
], IngredientModel);
exports.IngredientModel = IngredientModel;
