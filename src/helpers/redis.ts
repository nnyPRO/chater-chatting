const upstashRedisRestUrl = process.env.UPSTASH_REDIS_REST_URL
const authToken = process.env.UPSTASH_REDIS_REST_TOKEN

type Command = 'zrange' | 'sismember' | 'get' | 'smembers'

export async function fetchRedis(
    command: Command,
    ...args: (string | number)[]
) {
    if (!upstashRedisRestUrl || !authToken) {
        throw new Error('Missing Upstash Redis environment variables')
    }
    const commandUrl = `${upstashRedisRestUrl}/${command}/${args.join('/')}`
    const response = await fetch(commandUrl, {
        headers: {
            Authorization: `Bearer ${authToken}`,
        },
        cache: 'no-store',
    })

    if (!response.ok) {
        const errorText = await response.text()
        throw new Error(`Error executing Redis command: ${errorText}`)
    }

    const data = await response.json()
    return data.result
}