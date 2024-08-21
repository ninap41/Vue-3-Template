import axios from "axios"
import { ref, onBeforeMount, computed } from "vue"
import router from "../router"
import { useToast } from "primevue/usetoast"
import { CRUD as _CRUD, session_keys  } from "../types/session-types"

const $toast = useToast()

/* Includes localStorage  */
export function useLocalStorage() {
	async function retrieveDraftFromLocalStorage(key: session_keys, callback: any) {
		var cache = window.localStorage.getItem(String(key))
		if (!cache) {
			var new_cache = `{}`
			window.localStorage.setItem(String(key), new_cache)
			if (callback) callback({ cache })
		} else {
			const data = window.localStorage.getItem(String(key))
			console.log(data)
			if (callback) callback({ cache: data})
		}
	}

	async function getStorage(key: session_keys, value?: string | undefined) {
		const data = window.localStorage.getItem(key as session_keys)
		if (data) return data
		else return null
	}

	async function setStorage(key_: session_keys, value: any) {
		window.localStorage.setItem(key_ as unknown as string, value)
	}

	const clearStorage = () => {
				window.localStorage.clear()
		}

	const clear = async (): Promise<void> => {
		await clearStorage()
		window.location.reload()
	}

		const removeItem=(key:session_keys)=> {
				window.localStorage.removeItem(String(key))
		}
	

	const initLocalStorage = async (itemRef: any, key: any) => {
			itemRef.value = await getStorage(key);
			if (itemRef.value) {
				const itemIndex = itemRef.value.findIndex(
					(c: any) => c.id === itemRef.value
				);
				if (itemIndex === -1) router.push("/");
				else itemRef.value = itemRef.value[itemIndex];
			} 
		}
		
	const authenticated = () =>  window.localStorage.getItem( session_keys.name)

	return {
		  initLocalStorage,
		  retrieveDraftFromLocalStorage,
			getStorage,
			setStorage,
			clearStorage,
		  clear,
			removeItem, 
		  authenticated
	}
}