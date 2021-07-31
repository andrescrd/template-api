
import { Injectable } from "@nestjs/common";
import { BaseService } from "src/core/services/base-service";
import { Role } from "../entities/roles";

const DataService  = BaseService(Role);

@Injectable()
export class RolesService extends DataService { }