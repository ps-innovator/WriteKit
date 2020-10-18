<template>
	<div :class="{ box: state.settings.box }">
		<section v-if="state.settings.delete">
			<a class="active-link" @click="state.deleteBlock(index)">
				<b-icon icon="delete" size="is-medium" />Delete Block
			</a>
			<br /><br />
		</section>
		<section
			v-for="(type, i) in state.document.content[index]"
			:key="`${type.name}-${i}`"
		>
			<h2 v-if="state.settings.titles" class="subtitle">
				{{ type.name }}
			</h2>
			<a
				class="active-link"
				@click="deleteType(index, i)"
				v-if="state.settings.delete"
			>
				<b-icon size="is-small" icon="delete" />Delete Type</a
			>
			<textarea-autosize
				v-model="type.content"
				:class="{ 'disguised-input': true }"
				:placeholder="type.prompt"
				:style="`color:${type.color};`"
				@focus.native="handleFocus(type, i)"
			></textarea-autosize>
		</section>
	</div>
</template>

<script>
import state from "@/state";
export default {
	props: { index: Number},
	computed: {
		state() {
			return state;
		}
	},
	methods: {
		handleFocus: function (type, i) {
			state.selected = type;
			state.selectionIndex.blockIndex = this.index;
			state.selectionIndex.typeIndex = i;
		},
		deleteType(blockIndex,index) {

			if (state.document.content[blockIndex] == undefined) {
				return false;
			}
			if (state.document.content[blockIndex][index] == undefined) {
				return false;
			}

			state.document.content[blockIndex] = state.document.content[blockIndex].filter((d, i) => i !== index);
			state.settings.box = !state.settings.box
			state.settings.box = !state.settings.box
			
		}
	},
};
</script>

<style scoped>
</style>