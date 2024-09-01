export var tree = [
			{
					key: '0',
					label: 'Documents',
					data: 'Documents Folder',
					children: [
							{
									key: '0-0',
									label: 'Work',
									data: 'Work Folder',
									children: [
											{ key: '0-0-0', label: 'Expenses.doc',  data: 'Expenses Document' },
											{ key: '0-0-1', label: 'Resume.doc', data: 'Resume Document' }
									]
							},
							{
									key: '0-1',
									label: 'Home',
									data: 'Home Folder',
									executable: () => {},
									children: [{ key: '0-1-0', label: 'Invoices.txt', icon: 'pi pi-fw pi-file', data: 'Invoices for this month' }]
							}
					]
			},
			{
					key: '1',
					label: 'Events',
					data: 'Events Folder',
				executable: () => {},
					children: [
							{ key: '1-0', label: 'Meeting', icon: 'pi pi-fw pi-calendar-plus', data: 'Meeting' },
							{ key: '1-1', label: 'Product Launch', icon: 'pi pi-fw pi-calendar-plus', data: 'Product Launch' },
							{ key: '1-2', label: 'Report Review', icon: 'pi pi-fw pi-calendar-plus', data: 'Report Review' }
					]
			},
			{
					key: '2',
					label: 'Movies',
					data: 'Movies Folder',
					executable: () => {},
					children: [
							{
									key: '2-0',
								executable: (nextKey: any) => {
									const keys = nextKey.split('-')
									console.log(keys, "Keys from All Pacino movies ")
									
								},
									label: 'Al Pacino',
									data: 'Pacino Movies',
									children: [
											{ key: '2-0-0', label: 'Scarface', executable: () => {}, data: 'scarface.mpeg' },
											{ key: '2-0-1', label: 'Serpico', executable: () => {}, data: 'serpico.mpeg' }
									]
							},
							{
									key: '2-1',
									label: 'Robert De Niro',
									executable: () => {},

									children: [
											{ key: '2-1-0', label: 'Goodfellas', executable: () => {}, data: 'Goodfellas Movie' },
											{ key: '2-1-1', label: 'Untouchables', executable: () => {}, data: 'Untouchables Movie' }
									]
							}
					]
			}
	];


