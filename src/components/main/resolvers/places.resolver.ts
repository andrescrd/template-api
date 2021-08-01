import { BadRequestException, NotFoundException, Req } from "@nestjs/common";
import { Args, Mutation, Resolver } from "@nestjs/graphql";
import { Request } from 'express';
import BaseResolver from "src/core/resolvers/base-resolver";
import { PlaceInput } from "../dtos/place.input";
import { Place } from "../entities/places";
import { User } from "../entities/users";
import { PlacesService } from "../services/places.service";

const { ResolverQuery, ResolverMutation } = BaseResolver(Place, PlaceInput, {useAuthGuard: {query: false}});

@Resolver()
export class PlacesQueryResolver extends ResolverQuery<Place> {
    constructor(protected service: PlacesService) {
        super(service);
    }
}

@Resolver()
export class PlacesMutationResolver extends ResolverMutation<Place, PlaceInput> {
    constructor(service: PlacesService) {
        super(service);
    }

    @Mutation(() => Place)
    async addQuantity(@Req() request: Request, @Args('id') id: string) {
        const user = request.user as User;
        console.log(user);
        const place = await this.service.getOne(id);

        if (!place) {
            throw new NotFoundException()
        }

        const newQuantity = place.quantity + 1;

        if (newQuantity > place.maxQuantity) {
            throw new BadRequestException("quantity cannot be grater than maxQuantity")
        }

        return await this.service.update(id, { quantity: newQuantity })
    }

    @Mutation(() => Place)
    async removeQuantity(@Args('id') id: string) {
        const place = await this.service.getOne(id);

        if (!place) {
            throw new NotFoundException()
        }

        const newQuantity = place.quantity + 1;

        if (newQuantity < 0) {
            throw new BadRequestException("quantity cannot be lower than 0")
        }

        return await this.service.update(id, { quantity: newQuantity })
    }
}