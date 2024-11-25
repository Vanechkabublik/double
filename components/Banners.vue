<script lang="ts" setup>

</script>

<template>
    <div class="main-banners__container">
        <div class="main-banners">
            <div class="main-banner__item one-banner-item">
                <div class="main-banner__item-content">
                <h2 class="main-banner__item-title">Мы открылись!</h2>
                <p class="main-banner__item-text">Вводи промокод <span class="promocode">LUCKYCSYSTAL2025</span> и получи на баланс 100 ₽ - это небольшой приветсвенный бонус от нас)</p>
                <button class="main-banner__item-btn">Активировать промокод</button>
                <div class="main-banner__filter"></div>
                </div>
            </div>
            <div class="main-banner__item two-banner-item">
                <div class="main-banner__item-content">
                <h2 class="main-banner__item-title">О грустном...</h2>
                <p class="main-banner__item-text">Сожалеем, но на нашем сайте нет слотов и в будущем не предвидится, так как это большие затраты на обслуживание и работу агрегатора!</p>
                <div class="main-banner__filter"></div>
            </div>
            </div>
            <div class="main-banner__item news-banner__item">
                <div class="main-banner__item-content">
                    <h2 class="main-banner__item-title">Новости</h2>
                    <p class="no-news">Пока что новостей нет!</p>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.main-banners__container {
    max-width: 1440px;
    margin: 0 auto;
    padding: 25px 15px;
}
.main-banners {
    display: grid;
    gap: 20px;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: repeat(2, 1fr);
    @media (max-width: 850px) {
        grid-template-columns: 1fr; /* Одна колонка */
        grid-template-rows: auto; /* Автоматическая высота */
    }
}
.main-banner__item {
    padding: 60px 30px;
    border-radius: 10px;
    background-color: #222C38;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    position: relative;
    @media (max-width: 850px) {
        justify-content: center;
    }
}
.main-banner__filter {
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
.one-banner-item {
    grid-row: 1 / 3;  
    height: 450px;
    background-image: url('/assets/images/banners/1.png');
    background-position: center center;
    border-radius: 10px;
    @media (max-width: 850px) {
        grid-row: auto; /* Автоматическое размещение */
        height: auto; /* Снижение высоты */
    }
}
.two-banner-item {
    background-image: url('/assets/images/banners/2.png');
    background-position: center center;
    border-radius: 10px;
    @media (max-width: 850px) {
        height: 150px; /* Уменьшение высоты */
        background-size: cover; /* Адаптивное отображение фона */
    }
}
.main-banner__item-content {
    z-index: 2;
    border-radius: 10px;
    @media (max-width: 850px) {
        height: 150px; /* Уменьшение высоты */
    }
}
.main-banner__item-title {
    color: white;
    font-size: 30px;
    font-weight: 700;
    @media (max-width: 850px) {
        font-size: 20px;
    }
}
.main-banner__item-text {
    margin-top: 15px;
    font-size: 14px;
    font-weight: 500;
    color: $text-color;
    @media (max-width: 850px) {
        font-size: 12px;
    }
}
.main-banner__item-btn {
    margin-top: 35px;
    background-color: $primary-bg;
    border-radius: 10px;
    font-size: 14px;
    font-weight: 600;
    color: white;
    padding: 15px 25px;
    @media (max-width: 850px) {
        margin-top: 20px;
        font-size: 12px;
        text-align: left;
    }
}
.promocode {
    color: $primary-color-bg;
    text-transform: uppercase;
    text-decoration: underline !important;
    cursor: pointer;
}
.news-banner__item {
    justify-content: center;
    @media (max-width: 850px) {
        height: 150px;
    }
}
.no-news {
    margin-top: 15px;
    font-size: 16px;
    font-weight: 500;
    color: #b4b4b4;
    @media (max-width: 850px) {
        font-size: 12px;
    }
}
</style>
