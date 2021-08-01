import { UseGuards } from "@nestjs/common";
import { Resolver } from "@nestjs/graphql";
import BaseResolver from "src/core/resolvers/base-resolver";
import { GqlAuthGuard } from "../../auth/guards/gql-auth.guard";
import { PlaceInput } from "../dtos/place.input";
import { Place } from "../entities/places";
import { PlacesService } from "../services/places.service";

const {ResolverQuery, ResolverMutation} = BaseResolver(Place, PlaceInput);

@Resolver()
@UseGuards(GqlAuthGuard)
export class PlacesQueryResolver extends ResolverQuery<Place> {
     constructor(service: PlacesService) { 
        super(service);
    }
}

@Resolver()
@UseGuards(GqlAuthGuard)
export class PlacesMutationResolver extends ResolverMutation<Place, PlaceInput> {
    constructor(service: PlacesService) { 
        super(service);
    }
}