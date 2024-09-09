import axios from "axios"
import { ref, Ref } from "vue" //@ts-ignore -
import { useToasts } from "./use-toasts.ts"
//@ts-ignore -
const api = import.meta.env.API_ENDPOINT
//@ts-ignore -
// const deno_api = import.meta.env.DENO_API_ENDPOINT

/* For API REFERENCES  */
export function useData() {
	const { success, error } = useToasts()
	const scaffold = ref(false)
	const storage_keys = ["users", "entries"]

	async function getAll(tableName: string, type?: string) {
		console.log(`${api}/${tableName}/readAll`)
		try {
			const res = await axios.get(`${api}/${tableName}/readAll`)
			if (res.data) return res.data
		} catch (err) {
			error(`Could not retrieve ${type}: ${err}`)
		}
	}

	async function updateOne(tableName: string, body: any, type?: string) {
		const res = await axios.post(`${api}/${tableName}/updateOne`, body)
		if (res.data) success(`successfully updated ${type}`)
		else error(`Could not update ${type}`)
	}

	async function createOne(tableName: string, body: any, type?: string) {
		const res = await axios.put(`${api}/${tableName}/createOne`, body)
		if (res.status === 200) success(`created ${type}`)
		else error(`Could not create/archive ${type}`)
	}

	async function getOne(tableName: string, id: any, type?: string) {
		const res = await axios.get(`${api}/${tableName}/readAll`)
		if (res.data) res.data.filter((item: any) => item.id === String(id))
		else error(`Could not find ${type}`)
	}

	async function deleteOne(tableName: string, id: any, type?: string) {
		try {
			await axios.delete(`${api}/${tableName}/deleteOne/${id}`)
			success(`successfully deleted ${id}`)
		} catch (err) {
			error(`Could not delete ${type}`)
		}
	}

	async function scaffoldTables(customTables?: Array<string>) {
		if (!scaffold.value) {
			alert(`scaffolding tables`)
			const responses = []
			const t = storage_keys || customTables
			for (var i = 0; i < t.length; i++) {
				const res = await axios.get(`${api}${t[i]}/check`)
				responses.push(`for  <b style="color:yellow">"${t[i]}"</b>  ` + res.data)
			}
			const data = await Promise.all(responses)
			data.forEach((res) => {
				success(`info ${res}`)
			})
			scaffold.value = true
		}
	}

	const isEmpty = (ref_: Ref<string>) => {
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
