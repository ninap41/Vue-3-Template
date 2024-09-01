

<template>
	<h1 >Terminal WIP</h1>
	
	<Terminal
			welcomeMessage="Welcome to nina.io"
			:prompt="prompt_"
		 :commands="commands"
			aria-label="PrimeVue Terminal Service"
	/>
	
</template>
<script setup lang="ts">
	import { ref } from 'vue';
	import Terminal from 'primevue/terminal';
	import TerminalService from 'primevue/terminalservice'
import {tree } from './tree'

	
	// {
	// key: '2',
	// label: 'Movies',
	// data: 'Movies Folder',
	// executable: () => {},
	// children: [
	// 		{
	// 				key: '2-0',
	// 			executable: () => {},
	// 				label: 'Al Pacino',
	// 				data: 'Pacino Movies',
	// 				children: [
	// 						{ key: '2-0-0', label: 'Scarface', executable: () => {}, data: 'scarface.mpeg' },
	// 						{ key: '2-0-1', label: 'Serpico', executable: () => {}, data: 'serpico.mpeg' }
	// 				]
	// 		},
	// 	]
	let key = ref('0')
	let displayKey = ref('root')
	let state = ref(tree)
	let prompt_ = ref('nina.io' + ' / ' + displayKey.value + ' $ '  )
	const commands = ref([
		{
				name: 'echo',
				description: 'display styled message',
				handler: (self, fullCommand) => {	
						return ``;
				}
		},
		{
				name: 'cd',
				description: 'to navigate directories',
				handler: (self, fullcommand) => {}
		},
		{
			name: "open",
			description: "open a file",
			handler: (self, fullCommand) =>{}
		},
		{
			name: 'help',
			description: 'get a list of all commands',
			handler: (self, flags, fullCommand) => {		
				 let str= '*****Available commands*****\n'
					 self.forEach((self) => str += `${self.name} - ${self.description}\n`)
 					TerminalService.emit('response', str)
			}
		},
		{ name: 'ls',
		 description: 'list all folders and files in directory',
		handler: (self,flags, fullCommand) => {
			console.log("made it to ls")
				const nextNodes= tree.map(node => node.children)
			console.log("nextNodes", nextNodes)

			TerminalService.emit('response', `${nextNodes.map(node => node.label).join('\n')}`);
		 }
		}
	]);
	
let  getAllCommands = commands.value.map(c => c.name).join(', ')
	TerminalService.on('command', (command: string) =>  {
		console.log(command, "command")

		const parentCommand = command ? command.split(' ')[0] : command
		const command_= commands.value.find(c => c.name === command)
		console.log(parentCommand, "parentCommand")
		console.log(commands.value, "commands")

		if(!command_){
			TerminalService.emit('response', `"${command_}" error: Command not found`);
		} else {
			TerminalService.emit('response', command_.handler(command_, command.handler));
		}
	})

</script>
<style >
	:root {
		--p-terminal-color: yellowgreen !important;
		--p-terminal-prompt-gap: .5rem !important;
		--p-terminal-command-response-margin: rem !important;
		/* https://primevue.org/terminal/ */
	}
	.p-terminal,  {
	}

	.p-terminal-command-response {
		white-space: pre;
	}
	.p-terminal-prompt-label	{
		color: magenta;
	}
</style>
