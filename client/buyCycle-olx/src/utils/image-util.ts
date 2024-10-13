function getImageURL(name: string) {
    return new URL(`../../../../server/Images/${name}`, import.meta.url).href
}

export {getImageURL};