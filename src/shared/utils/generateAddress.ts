import { Values } from "src/pages/Home/components/Project"

const generateAddress = (values: Values) => {
  if (values.type === "url") return values.url
  if (values.type === "phone") return `tel:${values.phone}`
  if (values.type === "wifi")
    return `WIFI:T:${values.wifi.type};S:${values.wifi.ssid};P:${values.wifi.password};;`
  if (values.type === "email") {
    const params = new URLSearchParams({})
    if (values.email.subject) params.append("subject", values.email.subject)
    if (values.email.cc) params.append("subject", values.email.cc)
    return `mailto:${values.email.address}?${params.toString()}`
  }

  return values.url
}

export default generateAddress
