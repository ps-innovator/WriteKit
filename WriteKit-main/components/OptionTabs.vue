<template>
	<div class="option-tabs section" v-if="state.user && state.user.data">
		<b-tabs>
			<b-tab-item label="Insights">
				<section v-if="state.selected !== null">
					<h2 class="title">
						{{ state.selected.name }}
					</h2>
					<p style="white-space: pre-wrap; text-align: left">{{ state.selected.desc }}</p>
					<br />
					<b v-if="state.selected.starters.filter(e => e.trim() !== '').length == 0"
						>No Templates Available</b
					>
					<b-collapse v-else class="panel" animation="slide">
						<b-button
							:open="false"
							slot="trigger"
							type="is-light"
							class="subtitle"
							>Templates</b-button
						>
						<section
							style="
								max-height: 30vh;
								overflow-y: scroll;
								overflow-x: hidden;
							"
						>
							<div
								@click="addText(starter)"
								v-for="(starter, i) in state.selected.starters"
								:key="`${i}`"
							>
								<p
									class="template-btn box has-background-black has-text-light"
								>
									{{ starter }}
								</p>
							</div>
						</section>
					</b-collapse>
				</section>
				<p v-else>You Got This!</p>
			</b-tab-item>
			<b-tab-item label="Explorer">
				<b-collapse
					animation="slide"
					v-for="(block, i) in state.blocks"
					:key="i"
					:open="false"
				>
					<h3 slot="trigger" class="title is-3 block-list">
						{{ block.name }}
					</h3>
					<div>
						<div
							class="level add-block-card"
							v-for="(type, i) in block.types.filter(t=> t.special == undefined)"
							:key="i"
							:style="`border-color: ${type.color}; align-items: end;`"
						>
							<div class="level-left" style="width: 75%">
								<div>
									<h1 class="subtitle is-4">
										{{ type.name }}
									</h1>
									<h2 class="subtitle is-6">
										{{ type.desc }}
									</h2>
								</div>
							</div>

							<div class="level-right">
								<b-button @click="addBlock(type)" type="is-dark"
									>Add this type</b-button
								>
							</div>
						</div>
					</div>
				</b-collapse>
			</b-tab-item>
			<b-tab-item label="Settings">
				<section>
					<h2 class="subtitle">Visuals</h2>
					<div class="field">
						<b-switch v-model="state.settings.delete"
							>Show Delete</b-switch
						>
					</div>
					<div class="field">
						<b-switch v-model="state.settings.box">Box</b-switch>
					</div>
					<div class="field">
						<b-switch v-model="state.settings.titles"
							>Titles</b-switch
						>
					</div>
				</section>
				<br>
				<section>
					<h2 class="subtitle">Themes</h2>
					<b-field label="Theme">
						<b-select
							v-model="selectedTheme"
							@input="changeTheme"
							placeholder="Select a theme"
							expanded
						>
							<option
								v-for="(option,i) in state.themes"
								:value="option.theme"
								:key="`themesel-${i}`"
							>
								{{ option.name }}
							</option>
						</b-select>
					</b-field>
				</section>
			</b-tab-item>
			<b-tab-item label="Marketplace">
				<h1 class="title">Marketplace</h1>
				<br>
				<section v-if="isOnline">
					<div>
					<b-button size="is-medium" type="is-primary" :loading="isLoading"  @click="load('blockPack')" icon-left="format-align-center">
						 Search for Block Packs
					 </b-button>
					 <b-button size="is-medium" type="is-primary"  :loading="isLoading" @click="load('theme')"  icon-left="palette">
						 Search for Themes
					 </b-button>
					 </div>

					<div v-if="isConnected">
						<br>
						<h2>Offical {{type}}s</h2>
						<b-table :data="data">
							<b-table-column field="name" label="Name" width="40" v-slot="props">
                				{{ props.row.name }}
            				</b-table-column>
							<b-table-column field="desc" label="Description" width="80" v-slot="props">
                				{{ props.row.desc }}
            				</b-table-column>
							<b-table-column label="View" field="_id" width="40"  v-slot="props">
                				<b-button type="is-success" @click="promptInstall(props.row._id)">View</b-button>
            				</b-table-column>
						</b-table>
					</div>
					
				</section>
				<h2 v-else>Marketplace does not work in offline mode :c</h2>
			
			</b-tab-item>
		</b-tabs>
	</div>
</template>

<script>
import state from "../state/index.js";
import axios from "axios";
export default {
	computed: {
		state() {
			return state;
		},
		isOnline() {
			return navigator.onLine;
		},
		
	},
	data() {
		return {
			selectedTheme: null,
			isConnected:false,
			isLoading:false,
			type:"",
		};
	},
	methods: {
		promptInstall(id){
			window.open(`${window.location.protocol}//${window.location.host}/install/${this.type}/${id}`)
		},
		async load(type) {
			this.isLoading = true
			this.isConnected = false
			this.type = type.toLowerCase()
			const listing = await axios.post(`${window.location.protocol}//${window.location.host}/.netlify/functions/get-marketplace`, {
			  type
			})
			console.log(listing)
			if(listing.data.success){
				this.data = listing.data.data
				this.isConnected = true
				this.isLoading = false
			}else{
				this.isLoading = false
				this.$buefy.toast.open({type:"is-danger",message:"Could not get marketplace, please try again!"})
			}

		},
		changeTheme(e) {
			let style = document.getElementById("GLOBAL_STYLE");
			if (style == null) {
				let temp = document.createElement("style");
				temp.setAttribute("id", "GLOBAL_STYLE");
				document.querySelector("head").appendChild(temp);
				style = document.getElementById("GLOBAL_STYLE");
			}
			style.innerText = e;
		},
		addBlock(type) {
			let newType = JSON.parse(JSON.stringify(type));
			newType.content = "";
			if(state.document.content[state.selectionIndex.blockIndex]){
			state.document.content[state.selectionIndex.blockIndex].push(
				newType
			);
			}
		},
		addText(text) {
			if(state.document.content[state.selectionIndex.blockIndex] && state.document.content[state.selectionIndex.blockIndex][state.selectionIndex.typeIndex]){
			state.document.content[state.selectionIndex.blockIndex][
				state.selectionIndex.typeIndex
			].content = `${text} ${
				state.document.content[state.currentBlockIndex][state.typeIndex]
					.content
			}`;
			}else{

			}
		},
	},
};
</script>

<style scoped>
.option-tabs {
	flex: 1;
}

.add-block-card {
	border-left: solid 5px transparent;
	padding: 1rem;
	margin: 0;
}

.block-list {
	padding: 1rem 0;
}
</style>