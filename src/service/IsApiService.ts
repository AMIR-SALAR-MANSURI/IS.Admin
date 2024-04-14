import { ApiService } from "./ApiService";

class IsApiService extends ApiService{
    
    constructor() {

        const baseUrl = process.env.NEXT_PUBLIC_IS_TEST_API_URL
     
        super({ baseUrl: baseUrl as string, version: 1 })
        
    }
}

export {IsApiService}