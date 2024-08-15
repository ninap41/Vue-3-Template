<script setup lang="ts">
import { ref, onMounted, computed } from "vue"
import Button from "primevue/button"
import Card from "primevue/card"
import Tabs from "primevue/tabs"
import TabList from "primevue/tablist"
import Tab from "primevue/tab"
import TabPanels from "primevue/tabpanels"
import TabPanel from "primevue/tabpanel"
import MultiSelect from "primevue/multiselect"
import Tag from "primevue/tag"
import SpeedDial from "primevue/speeddial"
import { useToast } from "primevue/usetoast"
import Toast from "primevue/toast"
import sound0 from "@/assets/audio/woosh.mp3"
import sound1 from "@/assets/audio/metal_crash.mp3"
import sound2 from "@/assets/audio/vine_boom.mp3"
import sound3 from "@/assets/audio/metal_pipe_falling.mp3"
import sound4 from "@/assets/audio/peppino_yell_times.mp3"
import sound5 from "@/assets/audio/fire_ball.mp3"
import sound6 from "@/assets/audio/airhorn.mp3"
import sound7 from "@/assets/audio/taco_bell.mp3"
import sound8 from "@/assets/audio/bonk.mp3"
import sound9 from "@/assets/audio/lets_go_gambling.mp3"
import sound10 from "@/assets/audio/you_died_dark_souls.mp3"
import sound11 from "@/assets/audio/troll_roar_elden_ring.mp3"

const toast = useToast()

const allSounds: any = ref([
	{ description: "Magic", cat: "Magic", path: sound0, favorited: false },
	{ description: "Metal Crash", cat: "Actions", path: sound1, favorited: false },
	{ description: "Vine Boom", cat: "Meme", path: sound2, favorited: false },
	{
		description: "Metal Pipe Falling",
		cat: "Actions",

		path: sound3,
		favorited: false,
	},
	{
		description: "Peppino Yell (3x)",
		cat: "Funny",
		path: sound4,
		favorited: false,
	},

	{ description: "Fireball", cat: "Magic", path: sound5, favorited: false },

	{ description: "Airhorn", cat: "Funny", path: sound6, favorited: false },
	{ description: "Taco Bell", cat: "Funny", path: sound7, favorited: false },

	{ description: "Bonk", cat: "Funny", path: sound8, favorited: false },
	{ description: "Let's Go Gambling", cat: "Meme", path: sound9, favorited: false },

	{
		description: "You Died (Dark Souls)",
		cat: "Meme",
		path: sound10,
		favorited: false,
	},
	{
		description: "Troll Roar (Elden Ring)",
		cat: "Npcs",
		path: sound11,
		favorited: false,
	},
])


const savedSounds: any = ref([])
const selectedCategories = ref([])

const filteredSounds = computed(() => {
	return allSounds.value
		.filter((sound: any) =>
			selectedCategories.value.length === 0 || selectedCategories.value.some((cat: string) => cat === sound.cat)
				? sound
				: undefined
		)
		.sort((a: any, b: any) => (a.cat < b.cat ? -1 : a.cat > b.cat ? 1 : 0))
})

const Cats: any = {
	Funny: "warn",
	Npcs: "contrast",
	Magic: "info",
	Actions: "danger",
	Meme: "success",
	Music: "secondary",
}
const categories = ["Music", "Npcs", "Magic", "Meme", "Actions", "Music"]
let items = computed(() => [{ label: "Favorite" }])

onMounted(() => {
	if (window.localStorage.getItem("savedSounds")) {
		//@ts-ignore
		savedSounds.value = JSON.parse(window.localStorage.getItem("savedSounds"))
	} else {
		window.localStorage.setItem("savedSounds", JSON.stringify([])) //@ts-ignore
		savedSounds.value = JSON.parse(window.localStorage.getItem("savedSounds"))
	}
	if (savedSounds.value.length === 0) {
		//@ts-ignore
		savedSounds.value = JSON.parse(window.localStorage.getItem("savedSounds")) || []
	}
	allSounds.value.map((s: any, idx: string) => {
		savedSounds.value.forEach((saved: any) => {
			if (s.description === saved.description && s.favorited !== saved.favorited) {
				allSounds.value[idx].favorited = saved.favorited
			}
		})
	})
})

const speedDialFavoriteAction = (sound: any) => {
	if (
		allSounds.value.some((sound_: any) => sound_.description === sound.description && !sound.favorited) ||
		savedSounds.value.length === 0
	) {
		toast.add({
			severity: "success",
			summary: "Added Sound!",
			detail: `'${sound.description}' added to favorites...`,
			life: 3000,
		})

		sound.favorited = true
		savedSounds.value.push(sound)
		window.localStorage.setItem("savedSounds", JSON.stringify(savedSounds.value)) //@ts-ignore

		let idx = allSounds.value.findIndex((s: any) => sound.description === s.description)
		allSounds.value[idx].favorited = sound.favorited
	} else {
		toast.add({
			severity: "error",
			summary: "Removed Sound!",
			detail: `'${sound.description}' removed from favorites...`,
			life: 3000,
		})
		sound.favorited = false

		savedSounds.value = savedSounds.value.filter((s: any) => s.description !== sound.description)
		window.localStorage.setItem("savedSounds", JSON.stringify(savedSounds.value)) //@ts-ignore	}
		let idx = allSounds.value.findIndex((s: any) => sound.description === s.description)
		allSounds.value[idx].favorited = sound.favorited
	}
}

let audio: any = ref(undefined)

const playAudio = (path: string) => {
	toast.add({ severity: "info", summary: "PLAYING", detail: `playing sound...`, life: 1000 })

	if (!audio.value) {
		audio.value = new Audio(path)
		audio.value.play()
	} else {
		audio.value.pause()

		audio.value = new Audio(path)
		audio.value.play()
	}
}
</script>

<template>
	<Card>
		<template #title>Sound Board</template>
		<template #content>
			<Tabs value="0">
				<TabList>
					<Tab value="0">Favorites</Tab>
					<Tab value="2">All Sounds</Tab>
				</TabList>
				<TabPanels>
					<TabPanel value="0">
						<div class="grid mt-4">
							<div v-for="(sound, idx) in savedSounds" :key="sound.id">
								<div :class="'flex flex-col'">
									<Tag
										class="fadeinleft animation-duration-1000"
										@click="playAudio(sound.path)"
										:severity="Cats[`${sound.cat}`]"
										:value="Cats[sound.cat]"
									>
										{{ sound.description }} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
									</Tag>
									<SpeedDial
										show-icon="pi pi-ellipsis-v"
										id="p-speeddial-button-favorites"
										:class="`fadeinup animation-duration-${Math.floor(Math.random() + 10000)} -mr-2`"
										hide-icon="pi pi-times"
										:model="items"
										direction="up"
										:style="{ position: 'absolute', right: 0, bottom: 0 }"
										:buttonProps="{ severity: Cats[sound.cat], rounded: true }"
										:tooltipOptions="{ position: 'left' }"
									>
										<template #item="{ item, toggleCallback }">
											<div
												v-if="item.label === 'Favorite'"
												id="p-speeddial-button-background"
												class="flex flex-col items-end border-white cursor-pointer surface-ground"
												@click="() => speedDialFavoriteAction(sound)"
											>
												<span v-if="sound.favorited" class="pi pi-heart-fill" />
												<span v-else class="pi pi-heart" />
											</div>
										</template>
									</SpeedDial>
								</div>
							</div>
						</div>
					</TabPanel>

					<TabPanel value="2">
						<MultiSelect
							v-model="selectedCategories"
							display="chip"
							:options="categories"
							filter
							placeholder="Select Categories"
							:maxSelectedLabels="5"
							class="w-full md:w-80"
						/>

						<div class="grid mt-4">
							<Toast />

							<div v-for="sound in filteredSounds">
								<div class="flex flex-col">
									<Tag
										@click="playAudio(sound.path)"
										:severity="Cats[`${sound.cat}`]"
										:value="Cats[`${sound.cat}`]"
										class="fadeinleft animation-duration-1000 m-2"
									>
										{{ sound.description }} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
									</Tag>
									<SpeedDial
										show-icon="pi pi-ellipsis-v"
										id="p-speeddial-button-all"
										:class="`fadeinup animation-duration-${Math.floor(Math.random() + 1000)} -mr-2`"
										hide-icon="pi pi-times"
										:model="items"
										direction="up"
										:style="{ position: 'absolute', right: 0, bottom: 0 }"
										:buttonProps="{ severity: Cats[sound.cat], rounded: true }"
										:tooltipOptions="{ position: 'left' }"
									>
										<template #item="{ item, toggleCallback }">
											<div
												v-if="item.label === 'Favorite'"
												id="p-speeddial-button-background"
												class="flex flex-col items-end border-white cursor-pointer surface-ground"
												@click="() => speedDialFavoriteAction(sound)"
											>
												<span v-if="sound.favorited" class="pi pi-heart-fill" />
												<span v-else class="pi pi-heart" />
											</div>
										</template>
									</SpeedDial>
								</div>
							</div>
						</div>
					</TabPanel>
				</TabPanels>
			</Tabs>
		</template>
	</Card>
</template>

<style>
#p-speeddial-button-background {
	background-color: #18181a !important;
	padding: 1rem;
	border-radius: 50%;
}

.p-speeddial-button {
	scale: 0.5 !important;
	display: flex;
}

#p-speeddial-button-favorites {
	margin-bottom: -0.25rem;
}

#p-speeddial-button-all {
	margin-bottom: 0.25rem;
}

.p-tag {
	cursor: pointer;
}
</style>
