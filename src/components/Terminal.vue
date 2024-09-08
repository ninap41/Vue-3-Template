

<template>
	<h1 >Terminal WIP</h1>
	<p>displayKey - {{displayKey}}</p>
	<p>absoluteKey - {{absoluteKey }}</p>
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

	
	const constructedPrompt = (key__: string) =>  'nina.io' + ' $ ' 
	// let currentTreeDepth = ref(0) // 0 is the root
	let absoluteKey = ref("0")
	let displayKey = ref('root')
	let state = ref(tree)
	let prompt_ = ref(constructedPrompt(displayKey.value))

	const getNodePathAsArray = (string: string) => string.split("-").map(number => Number(number));
	const getNodeFromTree = (key): Array<strings> => { //"0-1"
		let rootTree = tree;
		const nodePath = getNodePathAsArray(key) //exampleTree:  ["0", "1", "1", "0", ]  or the shallowest level ["0"]
		console.log(nodePath)
		for(var i = 1 ; i < nodePath.length - 1; i++) { //Previous Directory!
			rootTree = rootTree.children[nodePath[i]]
		}
		return rootTree
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
					let nextNode = null; 
					const targetPath = fullcommand.split(' ')[1]
					if(targetPath === "..") {
							alert(JSON.stringify(absoluteKey.value))
							let tempTree = getNodeFromTree(absoluteKey.value)
							state.value = tempTree
							displayKey.value = tempTree.label;
							absoluteKey.value = tempTree.key
							nextNode = tempTree
							return `${tempTree.absolutePath} \n in ${displayKey.value}`				
					}
					if(targetPath === ".") {
						state.value = tree
						absoluteKey.value = "0"
						displayKey.value = "root"
						return `${state.value.absolutePath} \n in ${displayKey.value}`				
					}
					nextNode = state.value.children.find(node => node.label === targetPath)
					if(nextNode) {
						state.value = nextNode
						displayKey.value = nextNode.label;
						absoluteKey.value = nextNode.key
						return `${state.value.absolutePath} \n in ${displayKey.value}`				
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
					 commands.value.forEach((self) => str += `${self.name} - ${self.description}\n`)
 				return str
			}
		},
		{ name: 'ls',
		  description: 'list all folders and files in directory',
		  handler: (self,flags, fullCommand) => {
				let list=``;
				state.value.children.forEach(node => list += node.label + node.ext + '\n')
				return list
		 }
		}
	]);
	
let  getAllCommands = commands.value.map(c => c.name).join(', ')
	TerminalService.on('command', (command: string) =>  {

		const parentCommand = command ? command.split(' ')[0] : command
		
		const command_= commands.value.find(c => c.name === command.split(' ')[0] )
		const flags = command.split(' ').shift()
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
		--p-terminal-prompt-gap: 1.5rem !important;
		--p-terminal-command-response-margin: 1.5rem !important;
		
		/* https://primevue.org/terminal/ */
	}

	
	.p-terminal {
		background:  linear-gradient(to top, #011809, #000503) !important;
		padding:1rem;
	   font-family: monospace, monospace;
		color: #fff;
		-webkit-animation: glow 1s ease-in-out infinite alternate;
		-moz-animation: glow 1s ease-in-out infinite alternate;
		animation: glow 1s ease-in-out infinite alternate;
		
	}
	.p-terminal-command-response {
		white-space: pre;
	}
	.p-terminal-prompt-label	{
		color: #70cd92;
	}
	
	@-webkit-keyframes p-terminal {
		from {
			text-shadow: 0 0 10px #fff, 0 0 20px #fff, 0 0 30px #e60073, 0 0 40px #e60073, 0 0 50px #e60073, 0 0 60px #e60073, 0 0 70px #e60073;
		}
		to {
			text-shadow: 0 0 20px #fff, 0 0 30px #ff4da6, 0 0 40px #ff4da6, 0 0 50px #ff4da6, 0 0 60px #ff4da6, 0 0 70px #ff4da6, 0 0 80px #ff4da6;
		}
	}
</style>
