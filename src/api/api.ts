import axios, { AxiosResponse } from "axios";


const instance = axios.create({
    withCredentials: true,
    baseURL: "https://eoj3r7f3r4ef6v4.m.pipedream.net",
    headers: {
        "Content-Type": "application/json"
    }
})

export const requestAPI = (
    price: number,
    contribution: number,
    period: number,
    leasingAmount: number,
    percent: number
): Promise<AxiosResponse> => instance.post("", {
    "price": price,
    "contribution": contribution,
    "period": period,
    "leasingAmount": leasingAmount,
    "percent": percent
})

