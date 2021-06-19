export default async function (url) {
    const res = await fetch(url)
    const parsedRes = await res.json()

    return parsedRes
}
