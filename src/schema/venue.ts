import {
  ObjectType,
  InputType,
  Field,
  ID,
  Float,
  Int,
  Resolver,
  Query,
  Mutation,
  Arg,
  Ctx,
  Authorized,
} from "type-graphql";
import { Min, Max } from "class-validator";
import { getBoundsOfDistance } from "geolib";
import type { Context, AuthorizedContext } from "./context";

@InputType()
class CoordinatesInput {
    @Field(_type => Float)
    @Min(-180)
    @Max(180)
    longitude!: number;

    @Field(_type => Float)
    @Min(-90)
    @Max(90)
    latitude!: number;
}

@InputType()
class VenueInput {
    @Field(_type => String)
    venue!: string;

    @Field(_type => String)
    image!: string;

    @Field(_type => String)
    address!: string;

    @Field(_type => Int)
    capacity!: number;

    @Field(_type => CoordinatesInput)
    coordinates!: CoordinatesInput;
}

@ObjectType()
class Venue {
    @Field(_type => ID)
    id!: number;

    @Field(_type => String)
    userId!: string;

    @Field(_type => String)
    address!: string;

    @Field(_type => Float)
    latitude!: number;

    @Field(_type => Float)
    longitude!: number;

    @Field(_type => String)
    venue!: string;

    @Field(_type => String)
    image!: string;

    @Field(_type => String)
    publicId(): string {
        return this.image.split("/").pop()!.split(".").shift()!;
    }

    @Field(_type => Int)
    capacity!: number;
}

@Resolver()

export class VenueResolver { 
    @Authorized()
    @Mutation(_returns => Venue, { nullable: true })
    async createVenue(
        @Arg("input") input: VenueInput,
        @Ctx() ctx: AuthorizedContext
    ) {
        return await ctx.prisma.venue.create({
            data: {
                userId: ctx.uid,
                venue: input.venue,
                address: input.address,
                image: input.image,
                capacity: input.capacity,
                latitude: input.coordinates.latitude,
                longitude: input.coordinates.longitude,
            },
        });
    }

};
