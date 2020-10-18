<template>
	<div class="has-background-dark">
		<section
			class="hero is-link is-fullheight"
			style="background-color: #00cec9"
		>
			<div class="hero-body">
				<div class="container columns">
					<section class="ml-6 column">
						<h1
							class="title text-pop-up-top"
							style="font-size: 8rem"
						>
							WriteKit
						</h1>
						<h class="title first-subtitle"
							>Rewriting the writing process</h
						>
						<h2 class="subtitle">
							A powerful, flexible, and simple block based
							document editor.
						</h2>
						<br />
						<nuxt-link to="/dashboard">
							<b-button type="is-primary">Get started!</b-button>
						</nuxt-link>
					</section>
					<section class="column">
						<img class="tilt-in-right-2" src="@/assets/home.svg" />
					</section>
				</div>
			</div>
			
		</section>
		<div class="has-text-centered has-background-dark">
			<div class="columns benefit-cards">
				<div class="column">
					<div>
						<h2 class="subtitle">Built-in</h2>
						<h1 class="title">Extension Support</h1>
						<br />
						<p>Check for spelling, grammar, and more.</p>
					</div>
				</div>

				<div class="column">
					<div>
						<h2 class="subtitle">Flexible</h2>
						<h1 class="title">Blocks</h1>
						<br />
						<p>Organize your writing intuitively.</p>
					</div>
				</div>

				<div class="column">
					<div>
						<h2 class="subtitle">Full</h2>
						<h1 class="title">Offline Support</h1>
						<br />
						<p>Access at anytime, anywhere.</p>
					</div>
				</div>
			</div>

			<div class="columns benefit-cards">
				<div class="column">
					<div>
						<h2 class="subtitle">Documents can be</h2>
						<h1 class="title">Shared and Exported</h1>
						<br />
						<p> Export your work effortlessly.</p>
					</div>
				</div>

				<div class="column">
					<div>
						<h2 class="subtitle">Drag and Drop</h2>
						<h1 class="title">Document Editor</h1>
						<br />
						<p>
							Easily rearrange your writing.
						</p>
					</div>
				</div>

				<div class="column">
					<div>
						<h2 class="subtitle">Customizable</h2>
						<h1 class="title">Themes</h1>
						<br />
						<p class>Personalize your workspace.</p>
					</div>
				</div>
			</div>
			<!-- <div class="column">
				<div>
					<h2 class="subtitle">A Document Editor</h2>
					<h1 class="title">That makes the Process of Writing</h1>
					<br />
					<p>more approachable and enjoyable</p>
				</div>
			</div>
			<div class="column">
				<div>
					<h2 class="subtitle">
						With WriteKit, you can create an outline insec
					</h2>
					<h1 class="title"></h1>
					<br />
					<p></p>
				</div>
			</div> -->
		</div>
	</div>
</template>
<script>
import state from "../state";
export default {};
</script>

<style>
.text-pop-up-top {
	-webkit-animation: text-pop-up-top 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)
		both;
	animation: text-pop-up-top 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
}
.tilt-in-right-2 {
	-webkit-animation: tilt-in-right-2 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)
		1s both;
	animation: tilt-in-right-2 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94) 1s both;
}

.first-subtitle {
	position: relative;
	bottom: 2.5rem;
}

.bottom-header {
	position: relative;
	bottom: 2rem;
}

.main {
	flex: 1;
}
.hero-body {
	display: flex;
	justify-content: center;
	vertical-align: bottom;
	align-items: center;
}
.hero {
	margin-bottom: 1rem;
}
.main {
	background-image: linear-gradient(to right, #ec77ab 0%, #7873f5 100%);
}
.media-main,
.media-content {
	flex: 1;
	text-align: center;
}
.media-content .card * {
	color: #363636;
}
.media-content .card,
.media-main .media-video {
	height: 25vw;
	max-height: 25rem;
	width: 95%;
	margin: 5%;
}
.organization-cards {
	position: relative;
	top: 5rem;
}
.use-our-platform {
	position: relative;
	top: 5rem;
}
.media-content .card {
	padding: 1.5rem;
	display: flex;
	flex-direction: column;
	justify-content: center;
}
.column .card {
	height: 500px;
	width: 400px;
	margin: 1%;
}
.level .card {
	display: inline-block;
}
.cover-image {
	display: block;
	margin-left: auto;
	margin-right: auto;
	width: 50%;
}
.card1 {
	background-image: linear-gradient(
		45deg,
		#ff9a9e 0%,
		#fad0c4 99%,
		#fad0c4 100%
	);
	height: 500px;
	width: 400px;
}
.card2 {
	background-image: linear-gradient(
		45deg,
		#ff9a9e 0%,
		#fad0c4 99%,
		#fad0c4 100%
	);
	height: 500px;
	width: 400px;
}
.card3 {
	background-image: linear-gradient(
		45deg,
		#ff9a9e 0%,
		#fad0c4 99%,
		#fad0c4 100%
	);
	height: 500px;
	width: 400px;
}
.card4 {
	background-image: linear-gradient(
		45deg,
		#ff9a9e 0%,
		#fad0c4 99%,
		#fad0c4 100%
	);
	height: 500px;
	width: 400px;
}
.header-before-cards {
	text-align: center;
	width: 200rem;
	height: 5rem;
	margin-bottom: 3rem;
}
.benefit-cards {
	align-items: start;
	margin: 0 !important;
	background-color: #363636;
}
.benefit-cards > .column {
	padding: 2rem 1rem;
}
.benefit-cards > .column h2 {
	line-height: 2rem;
	margin-bottom: 1rem;
}
.benefit-cards > .column p {
	font-size: 1.25rem !important;
}
.benefit-cards * {
	color: white;
}

@-webkit-keyframes tilt-in-right-2 {
	0% {
		-webkit-transform: rotateX(30deg) translateX(300px) skewX(-30deg);
		transform: rotateX(30deg) translateX(300px) skewX(-30deg);
		opacity: 0;
	}
	100% {
		-webkit-transform: rotateX(0deg) translateX(0) skewX(0deg);
		transform: rotateX(0deg) translateX(0) skewX(0deg);
		opacity: 1;
	}
}
@keyframes tilt-in-right-2 {
	0% {
		-webkit-transform: rotateX(30deg) translateX(300px) skewX(-30deg);
		transform: rotateX(30deg) translateX(300px) skewX(-30deg);
		opacity: 0;
	}
	100% {
		-webkit-transform: rotateX(0deg) translateX(0) skewX(0deg);
		transform: rotateX(0deg) translateX(0) skewX(0deg);
		opacity: 1;
	}
}

@keyframes text-pop-up-top {
	0% {
		-webkit-transform: translateY(0);
		transform: translateY(0);
		-webkit-transform-origin: 50% 50%;
		transform-origin: 50% 50%;
		text-shadow: none;
	}
	100% {
		-webkit-transform: translateY(-50px);
		transform: translateY(-50px);
		-webkit-transform-origin: 50% 50%;
		transform-origin: 50% 50%;
		text-shadow: 0 1px 0 #cccccc, 0 2px 0 #cccccc, 0 3px 0 #cccccc,
			0 4px 0 #cccccc, 0 5px 0 #cccccc, 0 6px 0 #cccccc, 0 7px 0 #cccccc,
			0 8px 0 #cccccc, 0 9px 0 #cccccc, 0 50px 30px rgba(0, 0, 0, 0.3);
	}
}
</style>