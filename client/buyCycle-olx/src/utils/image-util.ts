const baseUrl = 'http://localhost:5000';

function getImageURL(name: string): any { 
    return new URL(`${baseUrl}/Images/${name}`, import.meta.url).href
}

export {getImageURL};