<template>
	<div>
		<Nav />
		<Nuxt />
	</div>
</template>

<script>
import state from "@/state";
export default {
	created: async function () {
		const temp = await state.getUser()
		const res = await state.selectDoc()
		console.log(temp)
	},
}
</script>

<style>
/* Vars */
:root {
	--primary: #714dd2;
	--success: #23d160;
	--danger: #ff3860;
	--warning: #ffdd57;
	--info: #209cee;
	--link: #3273dc;
	--light: #f5f5f5;
	--dark: #363636;
}

html {
	min-height: 100vh;
}

html,
body,
#__nuxt,
#__layout,
.is-page {
	display: flex;
	flex-direction: column;
	flex: 1;
}

* {
	font-family: Montserrat, Roboto, "Segoe UI", Arial, sans-serif !important;
}

li.bullet {
	padding-left: 1rem;
	position: relative;
}

li.bullet::before {
	content: "○";
	font-size: 0.75rem;
	position: absolute;
	left: 0;
	top: 0.25rem;
}
</style>