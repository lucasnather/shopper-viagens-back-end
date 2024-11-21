import routing, { RoutesClient } from '@googlemaps/routing'
import { Client } from '@googlemaps/google-maps-services-js'
import { env } from '../../env';
import { GoogleAuth } from 'google-auth-library';

export class GoogleMapsRepository {
    private routingClient: RoutesClient
    private client: Client

    constructor() {
        this.routingClient = new routing.v2.RoutesClient({
            authClient: new GoogleAuth().fromAPIKey(env.GOOGLE_API_KEY)
        })
        this.client = new Client({})
    }

    async callComputesRoutes(origin: any, destination: any) {
        const { originLat, originLng, destinationLat, destinationLng } = await this.calculateLongAndLat(origin, destination)

        const [response] = await this.routingClient.computeRoutes({
            origin: {
                address: origin,
                location: {
                latLng: {
                        latitude: originLat,
                        longitude: originLng
                    }
                }
                },
            destination: {
                    address: destination,
                    location: {
                    latLng: {
                        latitude: destinationLat,
                        longitude: destinationLng
                    }
                },
            }},
            {
                otherArgs: {
                    headers: {
                        "X-Goog-FieldMask": "routes.distanceMeters,routes.duration,routes.polyline.encodedPolyline"
                    }
                }
            }
        )
        return response
    }

    private async calculateLongAndLat(origin: string, destination: string) {
        const originData = await this.client.geocode({
            params:{
                address: origin,
                key: env.GOOGLE_API_KEY
            }
        })

        const destinationData = await this.client.geocode({
            params:{
                address: destination,
                key: env.GOOGLE_API_KEY
            }
        })

        const originLocation = originData.data.results[0].geometry.location
        const destinationLocation = destinationData.data.results[0].geometry.location

        return {
            originLat: originLocation.lat,
            originLng: originLocation.lng,
            destinationLat: destinationLocation.lat,
            destinationLng: destinationLocation.lng,
        }
    }
}

