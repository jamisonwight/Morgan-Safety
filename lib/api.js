import axios from 'axios'
import getConfig from "next/config"

const { publicRuntimeConfig } = getConfig()

const instance = axios.create({
    baseURL: publicRuntimeConfig.API_URL,
})

const linstance = axios.create({
    baseURL: publicRuntimeConfig.BASE_URL,
})

export { instance }
export { linstance }