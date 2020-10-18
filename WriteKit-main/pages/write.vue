<template>
	<div class="is-page">
		<div class="hero is-primary">
			<div class="hero-body">
				<h1 class="title is-1">WriteKit</h1>
			</div>
		</div>
		<b-modal v-model="state.menus.export" :width="640" scroll="keep">
			<div class="box section has-text-centered">
					<h1 class="title">Export Document</h1>

					<div class="field has-addons" style="justify-content: center;">
						<p class="control">
							<b-button tag="a" type="is-primary" :href="downloadAsTextURL" :download="`${state.document.metadata.title}.txt`">
								Plain Text (.txt)
							</b-button>
						</p>
						<p class="control">
							<b-button tag="a" type="is-success" :href="downloadAsMarkdownURL" :download="`${state.document.metadata.title}.md`">
								Markdown (.md)
							</b-button>
						</p>
						<p class="control">
							<b-button tag="a" type="is-warning" :href="downloadAsWriteKitURL" :download="`${state.document.metadata.title}.wkdoc`">
								WriteKit (.wkdoc)
							</b-button>
						</p>
					</div>
			</div>
		</b-modal>
		<section class="main-content">
			<OptionTabs />
			<WritingPane />
		</section>
	</div>
</template>

<script>
import state from "../state";
export default {
	computed: {
		state() {
			return state;
		},
		downloadAsTextURL() {
			return `data:text/plain;charset=utf-8,${encodeURIComponent(this.stitchContent(state.document.metadata.title, state.document.content))}`;
		},
		downloadAsWriteKitURL() {
			return `data:application/json;charset=utf-8,${encodeURIComponent(JSON.stringify(state.document))}`;
		},
		downloadAsMarkdownURL() {
			let finalData = `# ${state.document.metadata.title}\n\n`

			state.document.content.forEach(block => block.forEach(type => {
				finalData += `## ${type.name}\n\n${type.content}\n\n`;
			}));

			return `data:text/markdown;charset=utf-8,${encodeURIComponent(finalData)}`
		}
	},
	mounted() {
		if (state.user == null) {
			this.$router.push("/dashboard");
		}
		state.document = state.user.documents[state.selectedDocument];
	},
	methods: {
		stitchContent(title, content) {
			return `${title.trim()}\n\n${content.map((block) => block.map((e) => e.content).join(" ")).join("\n\n")}`;
		},
	}
};
</script>
<style scoped>
.main-content {
	display: flex;
	flex: 1;
	align-items: stretch;
}
</style>