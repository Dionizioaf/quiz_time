


const staticConfig = {
    "api_url": "http://localhost:3000"
}
export function getEnv(key) {
    let v  = process.env['key']
    return v === undefined ? staticConfig[key] : v
}