<template>
	<div class="components cursor-pointer" :class="isDark ? 'dark' : 'light'" @click="emits('toggleDark')">
		<!-- 组件所有元素 -->
		<div class="main-button">
			<!-- 按钮主体(圆) -->
			<div class="moon"></div>
			<div class="moon"></div>
			<div class="moon"></div>
			<!-- 月亮上的陨石坑 -->
		</div>

		<div class="daytime-backgrond"></div>
		<div class="daytime-backgrond"></div>
		<div class="daytime-backgrond"></div>
		<!-- 按钮底层的三个虚影 -->
		<div class="cloud">
			<!-- 所有的云 -->
			<div class="cloud-son"></div>
			<div class="cloud-son"></div>
			<div class="cloud-son"></div>
			<div class="cloud-son"></div>
			<div class="cloud-son"></div>
			<div class="cloud-son"></div>
		</div>
		<div class="cloud-light">
			<!-- 云的虚影 -->
			<div class="cloud-son"></div>
			<div class="cloud-son"></div>
			<div class="cloud-son"></div>
			<div class="cloud-son"></div>
			<div class="cloud-son"></div>
			<div class="cloud-son"></div>
		</div>
		<div class="stars">
			<!-- 所有星星，每一个星星由四个div拼合而成 -->
			<div class="star big">
				<div class="star-son"></div>
				<div class="star-son"></div>
				<div class="star-son"></div>
				<div class="star-son"></div>
			</div>
			<div class="star big">
				<div class="star-son"></div>
				<div class="star-son"></div>
				<div class="star-son"></div>
				<div class="star-son"></div>
			</div>
			<div class="star medium">
				<div class="star-son"></div>
				<div class="star-son"></div>
				<div class="star-son"></div>
				<div class="star-son"></div>
			</div>
			<div class="star medium">
				<div class="star-son"></div>
				<div class="star-son"></div>
				<div class="star-son"></div>
				<div class="star-son"></div>
			</div>
			<div class="star small">
				<div class="star-son"></div>
				<div class="star-son"></div>
				<div class="star-son"></div>
				<div class="star-son"></div>
			</div>
			<div class="star small">
				<div class="star-son"></div>
				<div class="star-son"></div>
				<div class="star-son"></div>
				<div class="star-son"></div>
			</div>
		</div>
	</div>
</template>

<script setup lang="js">
const emits = defineEmits(['toggleDark'])
const props = defineProps({
	isDark: {
		type: Boolean,
	}
});


// 云层浮动动画效果
// 定义一个获取随机方向的函数，随机选择移动距离'2px'或'-2px'
const getRandomDirection = () => {
	const directions = ['2px', '-2px'];
	return directions[Math.floor(Math.random() * directions.length)];
}

// 定义一个将元素移动到随机方向的函数
const moveElementRandomly = (element) => {
	const randomDirectionX = getRandomDirection(); // 获取随机的X方向
	const randomDirectionY = getRandomDirection(); // 获取随机的Y方向
	element.style.transform = `translate(${randomDirectionX}, ${randomDirectionY})`; // 将随机方向应用到元素的transform属性
}

// 在文档加载完成后执行以下代码
document.addEventListener('DOMContentLoaded', () => {
	const cloudSons = document.querySelectorAll('.cloud-son'); // 选择所有的.cloud-son元素

	// 每秒钟执行一次以下代码
	setInterval(() => {
		cloudSons.forEach(moveElementRandomly); // 将每一个.cloud-son元素移动到随机方向
	}, 1000);

});


</script>

<style lang="scss">
/* 最外层元素样式 */
.components {
	// 宽高比例
	--width-height-rate: calc(180 / 70);
	// 宽度
	--container-width: 100px;
	// 高度
	--container-height: calc(var(--container-width) / var(--width-height-rate));
	// main-button 宽高
	--btn-width: calc(55 / 70 * var(--container-height));
	// 按钮距离container
	--offset: calc(var(--btn-width) / 5);

	position: relative;
	width: var(--container-width);
	height: var(--container-height);
	background-color: rgba(70, 133, 192, 1);
	border-radius: 100px;
	box-shadow: inset 0 0 5px 3px rgba(0, 0, 0, 0.5);
	overflow: hidden;
	transition: 0.7s;
	transition-property: all;
	transition-timing-function: cubic-bezier(0, 0.5, 1, 1);

	/* 主要按钮样式 */
	.main-button {
		position: absolute;
		width: var(--btn-width);
		height: var(--btn-width);
		top: calc(var(--container-height) / 2 - var(--btn-width) / 2);
		left: var(--offset);

		background-color: rgba(255, 195, 35, 1);
		border-radius: 50%;
		box-shadow: 3px 3px 5px rgba(0, 0, 0, 0.5),
			inset -3px -5px 3px -3px rgba(0, 0, 0, 0.5),
			inset 4px 5px 2px -2px rgba(255, 230, 80, 1);
		cursor: pointer;
		// transition: 1.0s;
		// transition-timing-function: cubic-bezier(0.56, 1.35, 0.52, 1.00);
		// transition-property: all;
		transition: 1s all cubic-bezier(0.56, 1.35, 0.52, 1.00);
		z-index: 2;
	}

	/* 按钮背后的虚影 */
	&>.daytime-backgrond {
		--base-top: calc(60 / 70 * var(--container-height));
		--offset-top: calc(12 / 70 * var(--container-height));
		
		--base-bg-width: calc(0.5 * var(--container-width));
		// 三个背景小球的偏移量
		--offset-bg-width: calc(35 / 70 * var(--container-height));

		--bg-width: calc(var(--base-bg-width) + var(--offset-bg-width) * var(--i));

		position: absolute;
		border-radius: 50%;
		transition: 1.0s;
		transition-timing-function: cubic-bezier(0.56, 1.35, 0.52, 1.00);

		/* 根据需求计算偏移量 */
		top: calc(0px - var(--bg-width) / 2 + var(--container-height) / 2);
		left: calc(0px - var(--base-top) - var(--offset-top) * (var(--i) - 1));

		/* 根据需求计算宽度 */
		width: var(--bg-width);
		height: var(--bg-width);

		background-color: rgb(255, 255, 255);
		opacity: calc(0 - 0.0665 * var(--i) + 0.3165);
		/* 根据需求计算透明度 */
		z-index: var(--i);

		@for $i from 1 to 5 {

			/* 根据实际需求调整循环范围 */
			&:nth-child(#{$i}) {
				--i: #{$i};
			}
		}



	}

	/* 陨石坑样式 */
	.moon {
		position: absolute;
		background-color: rgba(150, 160, 180, 1);
		box-shadow: inset 0px 0px 1px 1px rgba(0, 0, 0, 0.3);
		border-radius: 50%;
		transition: 0.5s;
		opacity: 0;

		/* 第一个陨石坑 */
		&:nth-child(1) {
			--rate: 4.4;
			top: 13.64%;
			/* (7.5px / 55px) * 100% */
			left: 45.45%;
			/* (25px / 55px) * 100% */
			width: calc(var(--btn-width) / var(--rate));
			height: calc(var(--btn-width) / var(--rate));
		}

		/* 第二个陨石坑 */
		&:nth-child(2) {
			--rate: 2.75;
			top: 36.36%;
			/* (20px / 55px) * 100% */
			left: 13.64%;
			/* (7.5px / 55px) * 100% */
			width: 36.36%;
			/* (20px / 55px) * 100% */
			height: 36.36%;
			/* (20px / 55px) * 100% */
		}

		/* 第三个陨石坑 */
		&:nth-child(3) {
			--rate: 4.4;
			top: 59.09%;
			/* (32.5px / 55px) * 100% */
			left: 59.09%;
			/* (32.5px / 55px) * 100% */
			width: calc(var(--btn-width) / var(--rate));
			height: calc(var(--btn-width) / var(--rate));
		}
	}


	/* 云和云层虚影的初始位置 */
	.cloud,
	.cloud-light {
		width: 100%;
		height: 100%;
		transition: 1.0s;
		transition-timing-function: cubic-bezier(0.56, 1.35, 0.52, 1.00);
		/* 加入回弹动画 */
	}

	/* 云和虚影统一样式 */
	.cloud-son {
		position: absolute;
		background-color: #fff;
		border-radius: 50%;
		z-index: 2;
		transition: transform 6s, right 1s, bottom 1s;

		/* 云和虚影由6个圆形组成，第1个圆形和第7个圆形大小相同 */
		&:nth-child(6n+1) {
			right: -11.11%;
			/* (20px / 180px) * 100% */
			bottom: 14.29%;
			/* (10px / 70px) * 100% */
			width: 27.78%;
			/* (50px / 180px) * 100% */
			height: 71.43%;
			/* (50px / 70px) * 100% */
		}

		/* 云和虚影由6个圆形组成，第2个圆形和第8个圆形大小相同 */
		&:nth-child(6n+2) {
			right: -5.56%;
			/* (10px / 180px) * 100% */
			bottom: -35.71%;
			/* (-25px / 70px) * 100% */
			width: 33.33%;
			/* (60px / 180px) * 100% */
			height: 85.71%;
			/* (60px / 70px) * 100% */
		}

		/* 云和虚影由6个圆形组成，第3个圆形和第9个圆形大小相同 */
		&:nth-child(6n+3) {
			right: 11.11%;
			/* (20px / 180px) * 100% */
			bottom: -57.14%;
			/* (-40px / 70px) * 100% */
			width: 33.33%;
			/* (60px / 180px) * 100% */
			height: 85.71%;
			/* (60px / 70px) * 100% */
		}

		/* 云和虚影由6个圆形组成，第4个圆形和第10个圆形大小相同 */
		&:nth-child(6n+4) {
			right: 27.78%;
			/* (50px / 180px) * 100% */
			bottom: -50%;
			/* (-35px / 70px) * 100% */
			width: 33.33%;
			/* (60px / 180px) * 100% */
			height: 85.71%;
			/* (60px / 70px) * 100% */
		}

		/* 云和虚影由6个圆形组成，第5个圆形和第11个圆形大小相同 */
		&:nth-child(6n+5) {
			right: 41.67%;
			/* (75px / 180px) * 100% */
			bottom: -85.71%;
			/* (-60px / 70px) * 100% */
			width: 41.67%;
			/* (75px / 180px) * 100% */
			height: 107.14%;
			/* (75px / 70px) * 100% */
		}

		/* 云和虚影由6个圆形组成，第6个圆形和第12个圆形大小相同 */
		&:nth-child(6n+6) {
			right: 61.11%;
			/* (110px / 180px) * 100% */
			bottom: -71.43%;
			/* (-50px / 70px) * 100% */
			width: 33.33%;
			/* (60px / 180px) * 100% */
			height: 85.71%;
			/* (60px / 70px) * 100% */
		}
	}


	/* 云层在-2层 */
	.cloud {
		z-index: -2;
	}

	/* 云层虚影在云层下方,并且整体上移,逆时针旋转5度 */
	.cloud-light {
		position: absolute;
		right: 0px;
		bottom: 20%;
		opacity: 0.5;
		z-index: 1;
	}


	/* 所有星星样式 */
	.stars {
		transform: translateY(-125px);
		z-index: 1;
		transition: 1.0s;
		height: 100%;
		transition-timing-function: cubic-bezier(0.56, 1.35, 0.52, 1.00);
		/* 加入回弹动画 */
	}

	/* 大星星的宽高 */
	.big {
		--size: calc(var(--container-height) / 7);
	}

	/* 中星星的宽高 */
	.medium {
		--size: calc(var(--container-height) / 14);
	}

	/* 小星星的宽高 */
	.small {
		--size: calc(var(--container-height) / 18);
	}

	/* 星星绝对定位 */
	.star {
		position: absolute;
		width: calc(2 * var(--size));
		height: calc(2 * var(--size));
		animation-name: star;


		/* 第一个元素 */
		&:nth-child(1) {
			top: 6.11%;
			/* (11px / 180px) * 100% */
			left: 21.67%;
			/* (39px / 180px) * 100% */
			animation-duration: 3.5s;
		}

		/* 第二个元素 */
		&:nth-child(2) {
			top: 22.14%;
			/* (39px / 180px) * 100% */
			left: 50.56%;
			/* (91px / 180px) * 100% */
			animation-duration: 4.1s;
		}

		/* 第三个元素 */
		&:nth-child(3) {
			top: 14.29%;
			/* (26px / 180px) * 100% */
			left: 10.56%;
			/* (19px / 180px) * 100% */
			animation-duration: 4.9s;
		}

		/* 第四个元素 */
		&:nth-child(4) {
			top: 20.71%;
			/* (37px / 180px) * 100% */
			left: 36.67%;
			/* (66px / 180px) * 100% */
			animation-duration: 5.3s;
		}

		/* 第五个元素 */
		&:nth-child(5) {
			top: 11.67%;
			/* (21px / 180px) * 100% */
			left: 41.67%;
			/* (75px / 180px) * 100% */
			animation-duration: 3s;
		}

		/* 第六个元素 */
		&:nth-child(6) {
			top: 28.33%;
			/* (51px / 180px) * 100% */
			left: 21.11%;
			/* (38px / 180px) * 100% */
			animation-duration: 2.2s;
		}
	}

	/* 每一个星星由四个div向左浮动,拼合而成 */
	.star-son {
		float: left;
		width: var(--size);
		height: var(--size);
		background-image: radial-gradient(circle var(--size) at var(--pos), transparent var(--size), #fff);

		&:nth-child(1) {
			--pos: left 0;
		}

		&:nth-child(2) {
			--pos: right 0;
		}

		&:nth-child(3) {
			--pos: 0 bottom;
		}

		&:nth-child(4) {
			--pos: right bottom;
		}
	}

	/* 将星星闪烁动画应用于所有的star元素 */
	.star {
		transform: scale(1);
		transition-timing-function: cubic-bezier(0.56, 1.35, 0.52, 1.00);
		/* 加入回弹动画 */
		transition: 4s;
		/* 无限次重复动画 */
		animation-iteration-count: infinite;
		/* 动画在每个循环中正反交替播放 */
		animation-direction: alternate;
		animation-timing-function: linear;
		animation-name: twinkle;
		animation-delay: 2s;

	}

	&.light {
		background-color: rgba(70, 133, 192, 1);

		.main-button {
			transform: translateX(0);
			background-color: rgba(255, 195, 35, 1);
			box-shadow: 3px 3px 5px rgba(0, 0, 0, 0.5),
				inset -3px -5px 3px -3px rgba(0, 0, 0, 0.5),
				inset 4px 5px 2px -2px rgba(255, 230, 80, 1);
		}

		.daytime-backgrond {
			transform: translateX(0);
			--offset-translateX-hover: calc(var(--offset));
			--transformX-hover: calc(var(--i) * var(--offset-translateX-hover) - var(--offset));
		}


		&:hover {
			.main-button {
				transform: translateX(var(--offset));
			}

			.daytime-backgrond {
				transform: translateX(var(--transformX-hover));
			}
		}

		.moon {
			opacity: 0
		}

		.stars {
			transform: translateY(var(--container-height));
			opacity: 0;
		}

	}

	&.dark {
		background-color: rgba(25, 30, 50, 1);

		.main-button {
			transform: translateX(calc(var(--container-width) - var(--btn-width) - var(--offset)*2));
			right: var(--offset);
			background-color: rgba(195, 200, 210, 1);
			box-shadow: 3px 3px 5px rgba(0, 0, 0, 0.5),
				inset -3px -5px 3px -3px rgba(0, 0, 0, 0.5),
				inset 4px 5px 2px -2px rgba(255, 255, 210, 1);
		}

		.daytime-backgrond {
			--base-translateX: var(--container-width);
			--offset-translateX: var(--offset);
			--offset-translateX-hover: calc(var(--offset) * 2);

			--transformX: calc(var(--base-translateX) - var(--i) * var(--offset-translateX) - var(--offset));
			--transformX-hover: calc(var(--base-translateX) - var(--i) * var(--offset-translateX-hover) - var(--offset));

			transform: translateX(var(--transformX));
		}

		&:hover {

			.main-button {
				transform: translateX(calc(var(--container-width) - var(--btn-width) - var(--offset)*3));
			}

			.daytime-backgrond {
				transform: translateX(var(--transformX-hover));
			}
		}

		.cloud {
			transform: translateY(calc(var(--container-height) + var(--offset)));
		}

		.cloud-light {
			transform: translateY(calc(var(--container-height) + var(--offset)));
		}

		.moon {
			opacity: 1
		}

		.stars {
			transform: translateY(calc(0px - var(--container-height) / 1.5));
			opacity: 1;
		}


	}

	@keyframes star {

		0%,
		20% {
			transform: scale(0);
		}

		20%,
		100% {
			transform: scale(1);
		}
	}

	@keyframes twinkle {
		0% {
			transform: scale(1);
		}

		50% {
			transform: scale(0);
		}

		100% {
			transform: scale(1);
		}
	}

}
</style>