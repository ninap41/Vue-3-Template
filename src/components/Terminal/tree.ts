export type ExecutableFunction = (command?: string) => any | undefined

export interface TreeNode {
	key: string
	label: string
	absolutePath?: string
	ext: string
	data: string
	children?: TreeNode[]
	icon?: string
	executable?: ExecutableFunction
}

// Define the type for the handler function
export type CommandHandler = (self: any, flags: any, fullCommand: string) => string

// Define the type for the command object
export type Command = {
	name: string
	description: string
	handler: CommandHandler
}

export var tree: TreeNode = {
	key: "0",
	label: "Root",
	absolutePath: "Root/",
	ext: "/",
	data: "Folder",
	children: [
		{
			key: "0-0",
			label: "Documents",
			absolutePath: "Root/Documents/",
			ext: "/",
			data: "Folder",
			children: [
				{
					key: "0-0-0",
					label: "Work",
					absolutePath: "Root/Documents/Work/",
					ext: "/",
					data: "Folder",
					children: [
						{
							key: "0-0-0-0",
							absolutePath: "Root/Documents/Work/Expenses/",
							label: "Expenses",
							ext: ".doc",
							data: "Expenses Document",
						},
						{
							key: "0-0-1-2",
							absolutePath: "Root/Documents/Work/Resume/",
							label: "Resume",
							ext: ".doc",
							data: "Resume Document",
						},
					],
				},
				{
					key: "0-1",
					label: "Home",
					absolutePath: "Root/Documents/Work/Home/",
					ext: "/",
					data: "Folder",
					executable: (command?: string) => {
						if (command === "open") return "open"
					},
					children: [{ key: "0-1-0", label: "invoices", icon: "pi pi-fw pi-file", ext: ".txt", data: "txt" }],
				},
			],
		},
		{
			key: "1-1",
			label: "Events",
			absolutePath: "Root/Events/",
			ext: "/",
			data: "Events Folder",
			executable: () => {},
			children: [
				{ key: "1-1-0", label: "meeting", icon: "pi pi-fw pi-calendar-plus", ext: ".cal", data: "Calendar" },
				{ key: "1-1-1", label: "product-launch", icon: "pi pi-fw pi-calendar-plus", ext: ".cal", data: "Calendar" },
				{ key: "1-1-2", label: "report-review", icon: "pi pi-fw pi-calendar-plus", ext: ".cal", data: "Calendar" },
			],
		},
		{
			key: "2-2",
			label: "Movies",
			absolutePath: "Root/Movies/",
			data: "Folder",
			ext: "/",
			executable: () => {},
			children: [
				{
					key: "2-2-0",
					label: "al-pacino",
					absolutePath: "Root/Movies/al-pacino/",
					data: "Folder",
					ext: "/",
					children: [
						{ key: "2-2-0-0", label: "scarface", executable: () => {}, ext: ".mov", data: "Video" },
						{ key: "2-2-0-1", label: "serpico", executable: () => {}, ext: ".mov", data: "Video" },
					],
				},
				{
					key: "2-2-1",
					label: "robert-de-nero",
					absolutePath: "Root/Movies/robert-de-nero/",
					data: "Folder",
					ext: "/",
					executable: () => {},
					children: [
						{ key: "2-2-1-0", label: "goodfellas", ext: ".mov", executable: () => {}, data: "Video" },
						{ key: "2-2-1-1", label: "untouchables", ext: ".mov", executable: () => {}, data: "Video" },
					],
				},
			],
		},
	],
}
