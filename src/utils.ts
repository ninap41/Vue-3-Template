export async function sort(order: "asc" | "desc", data: Array<any>) {
	return await data.sort(function (a, b) {
		return new Date(a.date).getTime() > new Date(b.date).getTime()
			? order === "asc"
				? -1
				: 1
			: order === "desc"
			? 1
			: -1
	})
}

export const capitalize = (severity: string) => severity.charAt(0).toUpperCase() + severity.slice(1)

