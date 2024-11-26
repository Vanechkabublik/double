<template>
    <div class="games">
        <h2 class="games-title"><span class="games-title-blue">Наши</span> игры</h2>
        <div class="games__items">
            <div class="game__item game__item-mine">
                <div class="game__item-content">
                    <h3 class="game-item__title">Mines</h3>
                    <p class="game-item__text">Пройди все ячейки и не попади на мину. Удачи!</p>
                    <button class="game-item__btn">Играть</button>
                    <div class="game__item__filter"></div>
                </div>
            </div>
            <div class="game__item game__item-random">
                <div class="game__item-content">
                    <h3 class="game-item__title">Орел и решка</h3>
                    <p class="game-item__text">Думаю все знают эту игру. Выбери сторону и играй. Удачи!</p>
                    <button class="game-item__btn">Играть</button>
                    <div class="game__item__filter"></div>
                </div>
            </div>  
            <div class="game__item game__item-random">
                <div class="game__item-content">
                    <h3 class="game-item__title">Баблс</h3>
                    <p class="game-item__text">Выбери шанс победы, желаемую цель и играй. Удачи!</p>
                    <a href="/pingpong" class="game-item__btn">Играть</a>
                    <div class="game__item__filter"></div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>

</script>

<style lang="scss" scoped>
.games {
    max-width: 1440px;
    margin: 0 auto;
    padding: 35px 15px;
}
.games-title {
    font-size: 30px;
    font-weight: 700;
    color: white;
    @media (max-width: 850px) {
        font-size: 25px;
    }
}
.games-title-blue {
    color: $primary-color-bg;
}
.games__items {
    margin-top: 25px;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
    @media (max-width: 850px) {
        grid-template-columns: 1fr;
    }
}
.game__item {
    height: 200px;
    background-image: url('/assets/images/games/game.png');
    object-fit: cover;
    background-size: cover;
    background-position: center center;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    padding: 30px;
    position: relative;
}
.game__item__filter {
    z-index: -1;
    width: 100%;
	height: 100%;
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	background: #000;
	opacity: 0.6;
    border-radius: 10px;
}
.game__item-content {
    z-index: 2;
}
.game-item__title {
    font-size: 25px;
    color: white;
    font-weight: 600;
    @media (max-width: 850px) {
        font-size: 20px;
    }
}
.game-item__text {
    margin-top: 10px;
    font-size: 14px;
    font-weight: 500;
    color: $text-color;
    @media (max-width: 850px) {
        font-size: 12px;
    }
}
.game-item__btn {
    margin-top: 20px;
    background-color: $primary-bg;
    border-radius: 10px;
    font-size: 14px;
    font-weight: 600;
    color: white;
    padding: 15px 25px;
    display: block;
    width: 100px;
    @media (max-width: 850px) {
        font-size: 12px;
    }
}
</style>
