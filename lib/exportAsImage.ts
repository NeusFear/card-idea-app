import html2canvas from "html2canvas";

export const exportAsImage = async (el: HTMLElement | null, imageFileName: string) => {
    if (!el) {
        console.log("No element found")
        return;
    }
    const canvas = await html2canvas(el, {backgroundColor: null});
    const image = canvas.toDataURL("image/png", 1.0)
    downloadImage(image, imageFileName)
    console.log(imageFileName);
}

const downloadImage = ( blob: string, fileName: string ) => {
    const a = document.createElement('a')
    a.href = blob
    a.download = fileName
    a.style.display = "none"
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    a.remove()
}