import { useToast } from "primevue/usetoast"
import { capitalize } from "@/utils"

export function useToasts() {
	const toast = useToast()
	const renderToast = (severity: any, detail: string) => {
		toast.add({
			severity,
			summary: severity === "warn" ? capitalize("warning") : capitalize(severity) + "!",
			detail,
			life: 3000,
		})
	}
	const toastTypes = ["success",
			"error",
			"warn",
			"info"].map((key: string) => ({ [key]: (detail: string) => renderToast(key, detail) }))
	
	return Object.assign({}, ...toastTypes)
}

