<template>
	<div class="writing-pane section">
		<GlobalEvents @keydown.tab="onTab" />
		<!-- Title -->
		<header class="level">
			<p></p>
			<section class="level-right">
			<b-button
				type="is-primary"
				@click="saveDoc"
				>Save</b-button
			>
			<b-button
				type="is-success"
				@click="toggleExport"
				>Export</b-button
			>
			</section>
		</header>
		<input
			class="disguised-input title is-3 docTitle"
			v-model="state.document.metadata.title"
			placeholder="Your document's title"
		/>
		<div class="textContainer">
			<!-- Writing Portion -->
			<Draggable
				v-model="state.document.content"
				group="document"
			>
				<BlockInput
					v-for="(block, i) in state.document.content"
					:key="i"
					:index="i"
				/>
			</Draggable>
			<br>

			
		</div>
		<section v-if="state.currentBlockIndex == null || state.document.content.length == 0">
				<h3 class="subtitle">Create a new..</h3>
				<span>Search: </span><input v-model="searchInput" placeholder="Introduction" type="text" />
				<p
					v-for="(block, i) in filteredBlocks"
					:key="i"
					@click="createNewBlock(block)"
					class="link"
				>
					{{ block.name }}
				</p>
			</section>
			<section v-if="state.special !== null">
				<h3 class="subtitle">What's next?</h3>
				<p
					v-for="(option, i) in state.special.options.filter(option => option !== undefined && option !== null)"
					:key="`${option.name}%${i}`"
					class="link"
					@click="handleOption(option)"
				>
					{{ option.name }}
				</p>
				<p
					class="link"
					@click="endBlock()"
				>
					End Block
				</p>
			</section>
	</div>
</template>

<script>
import state from "../state";
import Draggable from "vuedraggable";

let staticIndex = 0;

export default {
	data(){
		return {
			searchInput:"",
			zoom:10
		}
	},
	computed: {
		state() {
			return state;
		},
		filteredBlocks(){
			if(this.searchInput.trim() !== ""){
				return state.blocks.filter(block => block.name.toLowerCase().includes(this.searchInput.toLowerCase()))
			}else{
				return state.blocks
			}
		}
	},
	methods: {
		saveDoc(){
			let save = state.saveDoc()
				this.$buefy.toast.open({
					message: "Saved",
					type: "is-success",
				});
		},
		toggleExport() {
			state.menus.export = !state.menus.export;
		},
		handleOption(option) {
			let newType = JSON.parse(JSON.stringify(option));
			newType.content = "";
			state.document.content[state.currentBlockIndex].push(newType);
			state.typeIndex = option.newIndex;
			state.special = null;
			
			
		},
		createNewBlock(block) {
			//Reset indexs
			state.typeIndex = 0;
			let nextType = JSON.parse(
				JSON.stringify(block.types[state.typeIndex])
			);
			nextType.content = "";
			state.document.content.push([nextType]);
			state.currentBlock = block;
			state.currentBlockIndex = state.document.content.length - 1;
		},
		endBlock(){
			state.currentBlock = null;
			state.currentBlockIndex = null;
			state.typeIndex = 0;
			state.special = null;
		},
		onTab() {
			//User pressed enter, determine next action

			//Do nothing if waiting for user to choose one
			if (state.currentBlockIndex === null) {
				this.$buefy.toast.open({
					message: "Please choose a block",
					type: "is-light",
				});
				return;
			}

			if (state.special !== null) {
				this.$buefy.toast.open({
					message: "Please choose a type",
					type: "is-light",
				});
				return;
			}

			//Move the type index up by one
			console.log(state.currentBlockIndex);
			state.typeIndex = state.typeIndex + 1;

			//If there are no more types, prompt user to choose new block
			if (state.currentBlock.types[state.typeIndex] == null) {
				state.currentBlock = null;
				state.currentBlockIndex = null;
				state.typeIndex = 0;
				return;
			}
			//If the next type is special, do special option
			if (state.currentBlock.types[state.typeIndex].special) {
				//Special types like looping

				switch (state.currentBlock.types[state.typeIndex].special) {
					case "loop":
						//Calc options
						let options = [];
						let last =
							state.currentBlock.types[
								state.currentBlock.types[state.typeIndex].index
							];
						let next = state.currentBlock.types[state.typeIndex + 1];

						//Format to special
						last.newIndex = state.currentBlock.types[state.typeIndex].index;
						if(next !== undefined){
						next.newIndex = state.typeIndex + 1;
						}
						//Add to menu
						options.push(last);
						options.push(next);
						let specialObj = JSON.parse(
							JSON.stringify({
								block: state.currentBlock,
								options,
							})
						);
						console.log(specialObj);
						state.special = specialObj;
						break;
				}
			} else {
				// ELSE - add next type to doc state.document.content[state.currentBlockIndex]
				let item = JSON.parse(
					JSON.stringify(state.currentBlock.types[state.typeIndex])
				);
				item.content = "";
				state.document.content[state.currentBlockIndex].push(item);
				this.$buefy.toast.open({
					type: "is-success",
					message: `Writing ${item.name}`,
				});
				state.selected = item;

			}
		},
	},
	components: { Draggable },
};
</script>

<style>
.writing-pane {
	flex: 2;
	background: var(--light);
	height: 110vh;
}

.disguised-input {
	background: transparent;
	outline: none;
	border: none;
	padding-left: 0;
	width: 100%;
	height: 3rem;
}

.no-blocks-indicator {
	background: var(--primary);
	color: white;
	padding: 1rem;
	display: inline-block;
	border-radius: 10px;
}
.link:hover {
	text-decoration: underline;
}
.template-btn {
	transition: 0.1s all ease-in-out;
}
.template-btn:hover {
	transform: translate(25px, 0px);
}
.textContainer {
	max-height: 70vh;
	overflow-y: scroll;
	
}
.textContainer::-webkit-scrollbar {
	width: 12px;
	background-color: #f5f5f5;
}

.textContainer::-webkit-scrollbar-thumb {
	border-radius: 10px;
	background-color: #0a0a0a;
}
</style>