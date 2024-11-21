import { RoutesClient } from '@googlemaps/routing'
import { env } from '../../env';

export class GoogleMapsRepository {
    private routingClient: RoutesClient

    constructor() {
        this.routingClient = new RoutesClient({
            apiKey: env.GOOGLE_API_KEY
        })
    }

    async callComputesRoutes(origin: any, destination: any) {
        const request = {
            origin,
            destination
        }

        const response = await this.routingClient.computeRoutes(request)
        console.log(response)
        return response
    }
}
