import * as jose from "jose"
import * as argon2 from "argon2"
import {GraphQLError} from "graphql/error";
import {createUser, userByUsername} from "./dao/auth";

const secret = new TextEncoder().encode('CHANGEME')
const alg = 'HS256'

export async function getUserByToken(token: string) {
    const {payload} = await jose.jwtVerify(token, secret, {
        issuer: 'urn:sdevelop:authsystem', audience: 'urn:sdevelop:contextauth',
    })
    return parseInt(payload.sub)
}

async function checkCredentials(userName: string, password: string) {
    const user = userByUsername(userName)
    if (user){
        if (await argon2.verify(user.Password, password)){
            return user.Id
        }
        return -1
    } else {
        return -1;
    }
}

export async function login(userName: string, password: string) {
    const userId = await checkCredentials(userName, password)
    if (userId > 0) {

        return await new jose.SignJWT({}).setProtectedHeader({alg})
                                         .setSubject(userId.toString())
                                         .setIssuedAt()
                                         .setIssuer('urn:sdevelop:authsystem')
                                         .setAudience("urn:sdevelop:contextauth")
                                         .setExpirationTime('2h')
                                         .sign(secret)
    } else {
        throw new GraphQLError('Invalid Username / Password', {
            extensions: {
                code: 'INVPW', http: {status: 403},
            },
        });
    }
}

export async function createAccount(username: string, password: string){
    const exists = userByUsername(username)
    if (exists){
        return false;
    }
    const userId = createUser({Username: username, Password: await argon2.hash(password)})
    return userId > 0;
}