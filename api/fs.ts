import axios, { AxiosResponse } from "axios";
const baseUrl = 'http://localhost:3002/upload';

export const upload = (blob: Blob) => {
    const formData = new FormData();
    formData.append("inputFile", blob);
    return new Promise<string>((resolve, reject) => {
        axios({
            url: baseUrl,
            method: "post",
            data: formData,
            onUploadProgress: ({ loaded, total }) => {
                console.log(loaded, total);
            },
        })
            .then((res: AxiosResponse<{ code: number; data: unknown; url: string }>) => {
                const { code, data, url } = res.data;
                if (code == 200) {
                    resolve(url);
                } else {
                    reject(res);
                }
            })
            .catch((err) => {
                reject(err);
            });
    });
}