//Not 100% sure why the eventlistener load with callback for image - 
export function loadImage(url) {
    return new Promise(resolve => {
        const image = new Image();
        image.addEventListener('load', () => {
            resolve(image)
        });
        image.src = url;
    });
}

export function loadLevel(name) {
    return fetch(`levels/${name}.json`)
        .then(r => r.json())
}