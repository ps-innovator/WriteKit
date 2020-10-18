<template>
	<div>
		<div class="hero is-primary">
			<div class="hero-body container has-text-left">
				<h1 class="title is-3 level">
					My
					<select v-model="page" class="change-display title is-3">
						<option value="Documents">Documents</option>
						<option value="Block Packs">Block Packs</option>
						<option value="Themes">Themes</option>
					</select>
				</h1>
			</div>
		</div>

		<div class="section container" v-if="state.user">
			<template v-if="page === 'Documents'">
				<section  v-if="state.user.documents.length !== 0">
				<div
				
					class="box document-card"
					v-for="(document, i) in state.user.documents"
					:key="i"
				>
					<div>
						<strong class="title is-5">{{
							document.metadata.title
						}}</strong>

						<div style="float: right">
							<a
								class="active-link"
								@click="changeSelectedDocument(i)"
								><b-icon icon="pencil-outline"
							/></a>
							<a
								class="active-link"
								@click="state.deleteDocument(i)"
								><b-icon icon="delete"
							/></a>
						</div>

						<div class="tag-group">
							<span class="tag is-success"
								>{{
									stitchContent(document.content).split(" ")
										.length
								}}
								Words</span
							>
							<span class="tag is-info"
								>{{
									stitchContent(document.content).length
								}}
								Characters</span
							>
						</div>

						<p class="writing-preview">
							{{
								stitchContent(document.content) ||
								"This document is currently empty."
							}}
						</p>
					</div>
				</div>
				</section>
				<div style="margin: 1rem">
					<div v-if="state.user.documents.length === 0">
						<h3 class="subtitle is-3">You have no documents!</h3>
						<br />
					</div>

					<b-button
						@click="createDocument"
						expanded
						type="is-info is-medium"
					>
						Add a document <b>+</b>
					</b-button>

					<b-field>
						<b-upload v-model="docUpload" drag-drop expanded>
							<div class="section has-text-centered">
								<b-icon icon="upload" size="is-large"></b-icon>
								<p class="subtitle is-4">
									Drag your block file here.
								</p>
							</div>
						</b-upload>
					</b-field>
				</div>
			</template>

			<template v-if="page === 'Block Packs'">
				<div
					class="box blockpack-card"
					v-for="(pack, i) in state.user.data.blockPacks"
					:key="i"
				>
					<div>
						<strong class="title is-5">{{ pack.name }}</strong>

						<div style="float: right">
							<a
								class="active-link"
								:download="`${pack.name}.wk`"
								:href="getDownloadURL(pack)"
								><b-icon icon="download"
							/></a>
							<a
								class="active-link"
								@click="state.deleteBlock(i)"
								><b-icon icon="delete"
							/></a>
						</div>

						<div class="tag-group">
							<span class="tag is-info">
								{{ pack.blocks.length }} Blocks
							</span>
						</div>

						<p class="writing-preview">{{ pack.desc }}</p>
					</div>
				</div>

				<b-field>
					<b-upload v-model="packUpload" drag-drop expanded>
						<div class="section has-text-centered">
							<b-icon icon="upload" size="is-large"></b-icon>
							<p class="subtitle is-4">
								Drag your block file here.
							</p>
						</div>
					</b-upload>
				</b-field>
			</template>

			<template v-if="page === 'Themes'">
				<div
					class="box blockpack-card"
					v-for="(theme, i) in state.user.data.themes"
					:key="i"
				>
					<div style="float: right">
						<a
							class="active-link"
							:download="`${theme.name}.wktheme`"
							:href="getDownloadURL(theme)"
							><b-icon icon="download"
						/></a>
						<a class="active-link" @click="state.deleteTheme(i)"
							><b-icon icon="delete"
						/></a>
					</div>

					<div>
						<strong class="title is-5">{{ theme.name }}</strong>

						<p class="writing-preview">{{ theme.desc }}</p>
						<br />
						<b-button @click="changeTheme(theme)" type="is-success"
							>Load Theme</b-button
						>
					</div>
				</div>

				<b-field>
					<b-upload v-model="themeUpload" drag-drop expanded>
						<div class="section has-text-centered">
							<b-icon icon="upload" size="is-large"></b-icon>
							<p class="subtitle is-4">
								Drag your theme file here.
							</p>
						</div>
					</b-upload>
				</b-field>
			</template>
		</div>
	</div>
</template>

<script>
import state from "@/state";
import axios from "axios";
export default {
	data() {
		return {
			open: true,
			page: "Documents",

			packUpload: null,
			themeUpload: null,
			docUpload: null
		};
	},

	computed: {
		state() {
			return state;
		},
	},

	methods: {
		changeTheme(e) {
			let style = document.getElementById("GLOBAL_STYLE");
			if (style == null) {
				let temp = document.createElement("style");
				temp.setAttribute("id", "GLOBAL_STYLE");
				document.querySelector("head").appendChild(temp);
				style = document.getElementById("GLOBAL_STYLE");
			}
			style.innerText = e.theme;
		},
		stitchContent(content) {
			return content
				.map((block) => block.map((e) => e.content).join(" "))
				.join(" ")
				.split("\n")
				.join(" ");
		},
		changeSelectedDocument(i) {
			state.selectedDocument = i;
			this.$router.push("/write");
		},
		async createDocument() {
			const res = await state.createDocument();

			if (res === false) {
				this.$buefy.toast.open(
					"Unable to create document. Reload and retry?"
				);
			} else {
				state.selectedDocument = res;
				this.$router.push("/write");
			}
		},
		getDownloadURL(pack) {
			return `data:application/json;charset=utf-8,${encodeURIComponent(
				JSON.stringify(pack)
			)}`;
		},
	},
	watch: {
		async themeUpload(themeFile) {
			// Null-check:
			if (themeFile === null) return;

			// Confirm it's a valid file:
			if (themeFile instanceof File) {
				// Confirm file extension:
				if (!packFile.name.endsWith(".wktheme")) {
					this.$buefy.toast.open(
						"The file is not a valid block pack (*.wktheme)."
					);
				}

				// Confirm it's JSON:
				try {
					const fileData = await themeFile.text();
					console.log("new theme", fileData);
					const data = JSON.parse(fileData);
					let theme = await axios.get(data.theme);
					data.theme = theme.data;
					const res = await state.installTheme(data);
					if (res) this.$buefy.toast.open("Installed theme!");
					else this.$buefy.toast.open("Could not install, try again");
					this.themeUpload = null;
				} catch (e) {
					console.log(e);
					this.$buefy.toast.open(
						"The file is unreadable. Please try again with another file."
					);
					this.themeUpload = null;
				}
			} else {
				this.$buefy.toast.open("Invalid file, please try again.");
				this.packUpload = null;
			}
		},
		async packUpload(packFile) {
			// Null-check:
			if (packFile === null) return;

			// Confirm it's a valid file:
			if (packFile instanceof File) {
				// Confirm file extension:
				if (!packFile.name.endsWith(".wkpack")) {
					this.$buefy.toast.open(
						"The file is not a valid block pack (*.wkpack)."
					);
				}

				// Confirm it's JSON:
				try {
					const fileData = await packFile.text();
					const data = JSON.parse(fileData);

					const res = await state.installBlockPack(data);
					if (res) this.$buefy.toast.open("Installed Pack!");
					else this.$buefy.toast.open("Could not install, try again");
					this.packUpload = null;
				} catch (e) {
					this.$buefy.toast.open(
						"The file is unreadable. Please try again with another file."
					);
					this.packUpload = null;
				}
			} else {
				this.$buefy.toast.open("Invalid file, please try again.");
				this.packUpload = null;
			}
		},
		async docUpload(docFile) {
			// Null-check:
			if (docFile === null) return;

			// Confirm it's a valid file:
			if (docFile instanceof File) {
				// Confirm file extension:
				if (!docFile.name.endsWith(".wkdoc")) {
					this.$buefy.toast.open(
						"The file is not a valid document (*.wkdoc)."
					);
				}

				// Confirm it's JSON:
				try {
					const fileData = await docFile.text();
					const data = JSON.parse(fileData);

					const res = await state.createDocument();
					if (res !== false) {
						state.user.documents[res] = data;
						this.$buefy.toast.open("Saved Document!");
					}
					else this.$buefy.toast.open("Could not upload, try again");
					this.docUpload = null;
				} catch (e) {
					console.log(e);
					this.$buefy.toast.open(
						"The file is unreadable. Please try again with another file."
					);
					this.docUpload = null;
				}
			} else {
				this.$buefy.toast.open("Invalid file, please try again.");
				this.docUpload = null;
			}
		}
	},
};
</script>

<style scoped>
.document-card {
	width: 30rem;
	display: inline-block;
	overflow: hidden;
	margin: 1rem;
	height: 12.5rem;
	border-right: 1rem solid white;
}

.blockpack-card {
	width: 30rem;
	display: inline-block;
	overflow: hidden;
	margin: 1rem;
	height: 12.5rem;
}

.writing-preview {
	margin-top: 1rem;
	margin-right: 1rem;
	overflow: hidden;
}

.hero .level > * {
	margin: 0 0.5rem;
}

.tag-group {
	margin: 0.5rem 0;
}
.change-display {
	background: none;
	border: none;
}

.change-display option {
	color: var(--dark);
	font-size: 1rem;
}

.active-link {
	margin: 0 0.5rem;
}
</style>	