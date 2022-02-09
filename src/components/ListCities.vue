<template>
    <div>
        <b-row class="pt-5">
            <h2 class="title pb-3">Cidades: </h2>
            <b-col md="3"  v-for="item in date" :key="item.id" class="mb-4">
                <div class="list-cities p-4">
                <div class="d-flex">
                    <div class="city">{{item.name}}</div>
                    <div class="ms-auto">
                        <b-icon icon="x-circle-fill" @click="removeCity(item.id)"></b-icon>
                    </div>
                </div>
                <div class="d-flex align-items-start pt-4 pb-3">
                        <div class="temperature">{{Math.round(item.main.temp)}}</div>
                        <div class="celcius">°C</div>
                </div>
                    <div class="info d-flex align-items-center">
                        {{item.weather[0].description}}
                        <div class="ms-auto">
                            <img :src="'http://openweathermap.org/img/w/' + item.weather[0].icon + '.png' " >
                        </div>
                    </div>
                </div>
            </b-col>
            <div class="no-city" v-if="date == 0">Nenhuma cidade cadastrada</div>
        </b-row>
    </div>
</template>

<script>
    export default {
        props: {
            date:  Array
        },
        mounted () {
            this.date
        },
        methods:{
            removeCity(id){
               const idCity = this.date.filter(city => city.id !== id)
               const newDate = idCity
               this.$emit('update:date', newDate )
            }
        }
    }
    
</script>

<style>
    /*Cities*/
    .list-cities {
            background-color: rgb(0 0 0 / 50%);
        box-shadow: 0 .5rem 1rem rgba(0, 0, 0, .55) !important;
        border-radius: 20px;
    }

    .city {
        color: #f55916;
        font-weight: 500;
        font-size: 25px;
    }

    .temperature {
        font-size: 64px;
        font-weight: bold;
        color: #ffffff;
    }

    .celcius {
        font-size: 27px;
        color: #ffffff;
    }

    .info {
        text-transform: uppercase;
        color: #ffffff;
    }
    .no-city{
        font-size: 30px;
        color: #ffffff;
    }
    svg.bi-x-circle-fill{
        color: #ffffff;
        cursor: pointer;
    }
</style>