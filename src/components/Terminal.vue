

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
	// children: [	]


	const constructedPrompt = (key__: string) =>  'nina.io' + ' / ' + key__ + ' $ ' 
	let currentTreeDepth = ref(0) // 0 is the root
	let absoluteKey = ref("0")
	let displayKey = ref('root')
	let state = ref(tree)
	let prompt_ = ref(constructedPrompt(displayKey.value))


	
	const getNodeFromTree = (key): Array<strings> => { //"0-1"
		const nodePath = () => { //exampleTree:  ["0", "1", "1", "0", ]  or the shallowest level ["0"]
			let noHyphens = key.replace(/-/g, '');
			let splitNumbers = noHyphens.split(/(?<=\d)(?=\d)/);
			return splitNumbers
		}
		let treeCopy = tree;
		currentTreeDepth.value = nodePath().length 
		for(var i = 0 ; i < nodePath().length; i++) {
			treeCopy = treeCopy[nodePath()[i]]
		}
		return treeCopy
	}
	
	const commands = ref([
		{
				name: 'echo',
				description: 'display styled message',
				handler: (self, flags, fullCommand) => {	
						return ``;
				}
		},
		{
				name: 'cd',
				description: 'to navigate directories',
				handler: (self,flags, fullcommand) => {
					const targetPath = fullcommand.split(' ')[1]
					let nextNode = null; 
					if(currentTreeDepth.value == 0 ) {
					 nextNode = state.value.find(node => node.label === targetPath)
					} else {
						 nextNode = state.value.children.find(node => node.label === targetPath)
					}
					if(nextNode) {
						state.value = nextNode
						console.log(state.value, "state.val")
						currentTreeDepth.value += 1
						absoluteKey.value = nextNode.key
						displayKey.value = targetPath

						 prompt_.value = constructedPrompt(targetPath)
						return `cd ${targetPath}. Now in ${targetPath}`
					} else {
						return 'No such directory'
					}
					
				}
		},
		{
			name: "open",
			description: "open a file",
			handler: (self, flags, fullCommand) =>{}
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
				let list=``;
				if(currentTreeDepth.value == 0 ) {
					state.value.forEach(node => list += node.label + '\n')
				} else {
					console.log("here child?",state.value.children)

					state.value.children.forEach(node => list += node.label + '\n')
				}
				return list

		 }
		}
	]);
	
let  getAllCommands = commands.value.map(c => c.name).join(', ')
	TerminalService.on('command', (command: string) =>  {

		const parentCommand = command ? command.split(' ')[0] : command
		
		const command_= commands.value.find(c => c.name === command.split(' ')[0] )
		const flags = command.split(' ').shift()
		// console.log(command, "command")
		// console.log(parentCommand, "parentCommand")
		// console.log(commands.value, "commands")
		if(!command_){
			TerminalService.emit('response', `"${command_}" error: Command not found`);
		} else {
			TerminalService.emit('response', command_.handler(command_, flags, command));
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
	.p-terminal-command-response {
		white-space: pre;
	}
	.p-terminal-prompt-label	{
		color: magenta;
	}
</style>
