
import { Injectable } from "@nestjs/common";
import { BaseService } from "src/core/services/base-service";
import { Place } from "../entities/places";

const DataService  = BaseService(Place);

@Injectable()
export class PlacesService extends DataService { }