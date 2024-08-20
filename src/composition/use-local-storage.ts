import axios from "axios"
import { ref, onBeforeMount, computed } from "vue"
import router from "../router"
import { useToast } from "vue-toast-notification"
import { CRUD as _CRUD, session_keys, CRUD, Character } from "../types/types"
import "vue-toast-notification/dist/theme-sugar.css"
const $toast = useToast()

/* Includes localStorage setup and api references */
export function useLocalStorage() {
	async function retrieveDraftFromLocalStorage(key: session_keys, callback: any) {
		var cache = window.localStorage.getItem(String(key))
		if (!cache) {
			var new_cache = `Hello! I didn't detect any session notes saved to drafts. So Here is a Placeholder! Store your campaign notes here bub.  ${key}`
			window.localStorage.setItem(String(key), new_cache)
			if (callback) callback({ cache })
		} else {
			const data = window.localStorage.getItem(String(key))
			console.log(data)
			if (callback) callback({ cache: data} )
		}
	}


	async function getStorage(key: session_keys, characterName?: string) {
		const data = window.localStorage.getItem(key as any)
		if (data) return data
		else return null
	}

	async function setStorage(key_: session_keys, characterName: string) {
		window.localStorage.setItem(key_ as unknown as string, name)
	}

	const clearStorage = () => {
				window.localStorage.clear()
		}

	const clear = async (): Promise<void> => {
		await clearStorage()
		router.push("/")
		window.location.reload()
	}

		const removeItem=(key:session_keys)=> {
				window.localStorage.removeItem(String(key))
		}
	// put in the router -- this is stupid
	const sessionGuard = async () => {
		const auth = await getStorage(session_keys.name)
		if(!auth) {
			router.push('/')
			$toast.warning("Please Choose Or Recreate A Character")
		}
	}

	const authenticated = () =>  window.localStorage.getItem( session_keys.name)

	return {
		retrieveDraftFromLocalStorage,
				getStorage,
				setStorage,
				clearStorage,
		clear,
				removeItem, 
		sessionGuard,
		authenticated
	}
}