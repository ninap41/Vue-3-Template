import axios from "axios"
import { ref,} from "vue"
import { useToast } from "primevue/usetoast"
import { useLocalStorage } from "./use-local-storage"

const toast = useToast()
const { setStorage } = useLocalStorage()

/* Includes localStorage setup and api references */
export function useData() {
	const api = "https://node-server-fs-ninap41.replit.app"
	// const external_api = "https://www.dnd5eapi.co/api/"
	const scaffold = ref(false)
	const tables_ = ["characters", "entries"]


	async function getAll(tableName: string, type?: String) {
		console.log(`${api}/${tableName}/readAll`)
		const res = await axios.get(`${api}/${tableName}/readAll`)
		if (res.data) {
			toast.add({
				severity: "success",
				summary: "success!",
				detail:`fully retrieved data for: ${type}`,
				life: 3000,
			})
			return res.data
		}
		else {
			toast.add({
				severity: "error",
				summary: "error!",
				detail:`Could not retrieve ${type}`,
				life: 3000,
			})
		}
	}

	async function updateOne(tableName: string, body: any,type?: String) {
		const res = await axios.post(`${api}/${tableName}/updateOne`, body)
		if (res.data) {
		toast.add({
			severity: "success",
			summary: "success!",
			detail:`successfully updated ${type}`,
			life: 3000,
		})		} else {
			toast.add({
				severity: "error",
				summary: "error!",
				detail:`could not update ${type}`,
				life: 3000,
			})
		}

	}

	async function createOne(tableName: String, body: any, type?: String) {
		const res = await axios.put(`${api}/${tableName}/createOne`, body)
		if (res.status === 200) {
			toast.add({
				severity: "success",
				summary: "success!",
				detail:`created ${type}`,
				life: 3000,
			})
		}
		else {
			toast.add({
				severity: "error",
				summary: "error!",
				detail:`Could not create/archive ${type}`,
				life: 3000,
			})
		}
	}

	async function getOne(tableName: string, id: any, type?: String) {
		const res = await axios.get(`${api}/${tableName}/readAll`)
		if (res.data) res.data.filter((item: any) => item.id === String(id))
	else {
		toast.add({
			severity: "error",
			summary: "error!",
			detail: `Could not find ${type}`,
			life: 3000,
		})
	}
	}
	async function deleteOne(tableName: string, id: any, type?: String) {
		await axios.delete(`${api}/${tableName}/deleteOne/${id}`)
	}

	async function scaffoldTables(customTables?: Array<String>) {
		if(!scaffold.value){
			toast.add({
				severity: "warn",
				summary: "in progress!",
				detail:`scaffolding tables`,
				life: 3000,
			})
			const responses = []
			const t = tables_ || customTables
			for (var i = 0; i < t.length; i++) {
				const res = await axios.get(`${api}${t[i]}/check`)
				responses.push(`for  <b style="color:yellow">"${t[i]}"</b>  ` + res.data)
			}
			const data = await Promise.all(responses)
			data.forEach((res) => {
				toast.add({
					severity: "info",
					summary: "success!",
					detail:`info ${res}`,
					life: 3000,
				})
			})
			scaffold.value = true
		}
	}

	const isEmpty = (ref_: Ref<String>) => {
		return !ref_.value || ref_.value === ""
	}

	return {
		scaffoldTables,
		deleteOne,
		createOne,
		updateOne,
		getAll,
		getOne,
		isEmpty,
	}
}
