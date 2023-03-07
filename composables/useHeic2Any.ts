
export const useHeic2Any = () => {
    useHead({
        script: [{ src: '/js/heic2any.min.js' }]
    });
    const imgs = document.querySelectorAll('img')

    const mainHandler = () => {
        if (!window.heic2any) {
            setTimeout(mainHandler, 500);
            return;
        }
        imgs.forEach(img => {
            const src = img.src
            if (!src.toUpperCase().endsWith('.HEIC')) return false;
            console.time(`heic2any:${src}`)
            console.time(`heic2any:fetch:${src}`)
            fetch(img.src).then(res => res.blob())
                .then(blob => {
                    console.timeEnd(`heic2any:fetch:${src}`)
                    if (!window.heic2any) return;
                    window.heic2any({ blob, toType: "image/gif", gifInterval: 0.1 }).then(b => {
                        if (!Array.isArray(b)) {
                            img.src = URL.createObjectURL(b)
                            console.log('heic2any finish')
                            console.timeEnd(`heic2any:${src}`)
                        } else {
                            console.log(img.src, 'is Mulit blob')
                        }
                    })
                })
        })
    }

    if (!window.heic2any) {

    } else {
        console.log('has not')
    }
    mainHandler()

}