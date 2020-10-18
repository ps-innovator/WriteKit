<template>
	<div v-if="state.user && state.user.data">
		<div class="hero is-success">
			<div class="hero-body">
				<h1 class="title is-1">WriteKit Build</h1>
				<h2 class="subtitle is-4">
					Create block packs to structure your writing.
				</h2>
			</div>
		</div>

		<div class="section">
			<h1 class="title is-4">Import Pack</h1>
			<form @submit.prevent="importBlockPack" class="field has-addons">
				<p class="control">
					<b-select
						v-model="selectedPack"
						placeholder="Select a Block Pack"
					>
						<option
							v-for="(option, i) in state.user.data.blockPacks"
							:value="option"
							:key="`bp-${i}`"
						>
							{{ option.name }}
						</option>
					</b-select>
				</p>
				<p class="control">
					<b-button type="is-info" native-type="submit" extended
						>Import Pack</b-button
					>
				</p>
			</form>
		</div>

		<form @submit.prevent="createBlockPack" class="section">
			<h1 class="title is-4">Pack Name</h1>
			<b-field label="Name">
				<b-input
					v-model="pack.name"
					placeholder="What is your block pack called?"
				/>
			</b-field>
			<b-field label="Author">
				<b-input
					v-model="pack.author"
					placeholder="What is your name?"
				/>
			</b-field>
			<b-field label="Version">
				<b-input
					v-model="pack.version"
					placeholder="What is the block pack version?"
				/>
			</b-field>
			<b-field label="Description">
				<textarea-autosize
					class="input"
					placeholder="Block pack description"
					v-model="pack.desc"
				/>
			</b-field>
			<br />

			<h1 class="title is-4">Blocks</h1>

			<div class="field has-addons">
				<p class="control">
					<b-button type="is-success" @click="addBlock"
						>Create block</b-button
					>
				</p>
				<p class="control">
					<b-button type="is-warning" @click="installBlock"
						>Install Pack</b-button
					>
				</p>

				<p class="control">
					<b-button
						type="is-primary"
						tag="a"
						:href="downloadURL"
						:download="`${pack.name || `new-pack`}.wkpack`"
					>
						Download Pack
					</b-button>
				</p>
			</div>
			<br />

			<Draggable v-model="pack.blocks">
				<div
					v-for="block in pack.blocks"
					:key="block.staticIndex"
					class="box editor-box"
				>
					<input
						class="input title is-5 title-input"
						placeholder="Block Title"
						v-model="block.name"
					/>

					<h4 class="title is-5">Types</h4>

					<b-button
						type="is-success"
						@click="addTypeTo(block.staticIndex)"
						>Add type</b-button
					>
					<br /><br />

					<section
						class="type-editor"
						v-for="(type, i) in block.types"
						:key="i"
					>	
					<br>
						<div>
						
							 <div class="field" >
							 	<b-checkbox v-model="type.special">Loop?</b-checkbox>
							 </div>
							 <section v-if="type.special">
							 	<p clas="subtitle">Index to jump To</p>
							  	<input type="number" v-model="type.index"/>
							 </section>
						
						</div>
						<br>
						<section v-if="!type.special">
						
						<div>
							<input
								class="input title is-6 title-input"
								placeholder="Type Title"
								v-model="type.name"
							/>
						</div>
							<h2 class="subtitle">{{i}}</h2>
						<div class="columns">
							<div class="column">
								<h4 class="subtitle is-6">Description</h4>
								<textarea-autosize
									class="input"
									placeholder="Describe your block."
									v-model="type.desc"
								/>
							</div>

							<div class="column">
								<h4 class="subtitle is-6">Prompt</h4>
								<textarea-autosize
									class="input"
									placeholder="Provide a starting point, how do we use it?"
									v-model="type.prompt"
								/>
							</div>
						</div>

						<div class="columns">
							<div class="column">
								<h4 class="subtitle is-6">Accent Color</h4>
								<input type="color" v-model="type.color" />
							</div>

							<div class="column">
								<h4 class="subtitle is-6">Templates</h4>
								<textarea-autosize
									class="input"
									placeholder="Separate your templates by a newline (hit ENTER/RETURN)."
									v-model="type.starters"
								/>
							</div>
						</div>
						</section>
					</section>
				</div>
			</Draggable>
		</form>
	</div>
</template>

<script>
let staticIndex = -1;
import Draggable from "vuedraggable";
import state from "@/state";
export default {
	data() {
		return {
			selectedPack: null,
			pack: {
				name: "",
				desc: "",
				version: "",
				blocks: [],
				author: "",
			},
		};
	},
	computed: {
		finalPack() {
			return {
				name: this.pack.name,
				desc: this.pack.desc,
				version: this.pack.version,
				author: this.pack.author,
				blocks: this.pack.blocks.map((block) => ({
					name: block.name,
					types: block.types.map((type) => ({
						...type,
						starters: type.starters.split("\n"),
						special: type.special ? "loop" : undefined,
						index: type.index ? parseInt(type.index) : undefined
					})),
				})),
			};
		},
		downloadURL() {
			return `data:application/json;charset=utf-8,${encodeURIComponent(
				JSON.stringify(this.finalPack)
			)}`;
		},
		state: () => state,
	},
	methods: {
		importBlockPack() {
			if (this.selectedPack !== null) {
				console.log(this.selectedPack);
				let pack = this.selectedPack;
				pack.blocks = pack.blocks.map((b) => ({
					...b,
					types: b.types.map((t) => ({
						...t,
						starters: (t.starters || []).join("\n"),
						special: t.special === "loop"
					})),
				}));
				this.pack = pack;
				this.selectedPack = null;
			}
		},
		async installBlock() {
			let res = await state.installBlockPack(this.finalPack);
			if (res) {
				this.$buefy.toast.open("Installed Pack Locally!");
			} else {
				this.$buefy.toast.open("Could not install, try again");
			}
		},
		addBlock() {
			staticIndex++;
			this.pack.blocks.push({
				staticIndex,
				name: "New Block",
				types: [],
			});
		},
		addTypeTo(index) {
			const i = this.pack.blocks.findIndex(
				(block) => block.staticIndex === index
			);
			this.pack.blocks[i].types.push({
				name: "New Type",
				desc: "a new description",
				prompt: "a brand-new prompt",
				color: "#000000",
				starters: "Template 1\nTemplate 2",
			});
		},
	},
	components: { Draggable },
};
</script>

<style scoped>
.whitesmoke{
	color:whitesmoke !important;
}
.box * {
	color: whitesmoke;
}

.editor-box {
	background: rgb(54, 57, 63);
}

input[type="color"] {
	transform: scale(2) translateX(0.75rem);
}

.type-editor {
	margin: 1rem 0;
}
</style>

<style>
.editor-box input,
.editor-box textarea {
	background: #1f2024;
	border: none;
}

.editor-box input.title-input {
	background: royalblue;
}
</style>			