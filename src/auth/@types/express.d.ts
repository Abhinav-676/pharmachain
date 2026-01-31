import { AuthToken } from "../utils/Types";


declare global {
    namespace Express{
        interface Request {
            user?: AuthToken
        }
    }
}