<template>
  <div id="app">
    <div class="main">
      <b-container>
        <h1 class="title">Consumo API OpenWeather</h1>
        <div class="search-city">
          <b-row>
            <b-col cols="6">
              <b-form-input v-model="query" type="text" placeholder="Cidade..." class="form-weahter" required></b-form-input>
              <b-icon icon="search"></b-icon>
            </b-col>
            <b-col cols="6" class="d-flex">
              <button type="button" class="btn-weather pl-4" @click="addCity()">Adicionar</button>
            </b-col>
            <b-spinner class="mt-4" v-if="loading"></b-spinner>
            <div class="error" v-if="error.status">{{error.msg}}</div>
          </b-row>
        </div>
        <b-row>
          <ListCities :date.sync="date" v-if="!loading" />
        </b-row>
      </b-container>
    </div>
  </div>
</template>

<script>
  import ListCities from '@/components/ListCities.vue'

  export default {
    name: 'App',
    components: {
      ListCities,

    },
    data() {
      return {
        api: 'https://api.openweathermap.org/data/2.5/',
        key: '544112d00f458df9b8a3371c633a2ad0',
        cities: {
          lages: 3458930,
          floripa: 6323121,
          caruaru: 3402655,
          rio: 3451190,
          saoPaulo: 3448439
        },
        date: [],
        query: '',
        loading: false,
        error: {
          status: false,
          msg: ''
        }
      }
    },

    mounted() {
      this.fetchCities()
    },

    methods: {

      fetchCities() {
        this.loading = true
        const getCities =
          `${this.cities.lages},${this.cities.floripa},${this.cities.caruaru},${this.cities.rio},${this.cities.saoPaulo}`

        fetch(`${this.api}group?id=${getCities}&appid=${this.key}&lang=pt_br&units=metric`)
          .then((response) => response.json())
          .then(data => {
            this.date = data.list
            this.loading = false
          })
          .catch(error => {
            alert(error)
          });
      },

      addCity() {
        if (this.query == '') {
          this.error.status = true
          this.error.msg = 'Digite uma cidade'
        } 
        else {
          fetch(`${this.api}weather?q=${this.query}&appid=${this.key}&lang=pt_br&units=metric`)
            .then((response) => response.json())
            .then(data => {
              if (data.cod == 200) {
                const repeatCity = this.date.find(item => item.id == data.id)
                if(!repeatCity){
                  this.date.unshift(data);
                  this.error.status = false
                }
                else{                
                  this.error.status = true
                  this.error.msg = 'Cidade já cadastrada'
                }
              } 
              else {
                this.error.status = true
                this.error.msg = 'Cidade não encontrada'
              }
            })
            .catch(error => {
              alert(error)
            })
        }
      }
    }
  }
</script>

<style>
  #app {
    background-color: #091f43;
    height: auto;
    display: flex;
    align-items: center;
    min-height: 100vh;
  }

  .main {
    width: 100%;
    padding-top: 2rem;
  }

  .title {
    color: #ffffff;
    font-weight: bold;
  }

  .search-city {
    padding-top: 1.5rem;
  }

  svg.bi-search {
    position: relative;
    bottom: 32px;
    left: 0px;
    color: #ffffff;
  }

  .spinner-border {
    color: white;
  }

  .error {
    color: red;

  }

  .btn-weather {
    background-color: #f55916;
    text-transform: uppercase;
    letter-spacing: .1rem;
    height: 48px;
    border: none;
    margin-left: 1rem;
    font-weight: 500;
    padding: 6px 12px;
    color: white;
    border-radius: 10px;
  }

  .btn-weather:hover {
    background-color: #b64615 !important;
  }
</style>