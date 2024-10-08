/* global Vue axios */ //> from vue.html

//const { createApp } = require("vue/dist/vue.js")

import "@ui5/webcomponents/dist/Text.js";
import "@ui5/webcomponents/dist/Table.js";
import "@ui5/webcomponents/dist/TableCell.js";
import "@ui5/webcomponents/dist/TableHeaderRow.js";
import "@ui5/webcomponents/dist/TableHeaderCell.js";
import "@ui5/webcomponents/dist/Input.js";
import "@ui5/webcomponents/dist/Title.js";
import "@ui5/webcomponents/dist/Link.js";
import "@ui5/webcomponents-icons/dist/video.js";

import {createApp} from 'vue'

const $ = sel => document.querySelector(sel)
const GET = (url) => axios.get('/browse'+url)
const POST = (cmd,data) => axios.post('/browse'+cmd,data)

const exercises = createApp ({

    data() {
      return {
        list: [],
        exercise: undefined,
        exercises: [],
        user: undefined
      }
    },

    methods: {

        search: ({target:{value:v}}) => exercises.fetch(v && '?$search='+v),

        async fetch (etc='') {
            const {data} = await GET(`/Exercises${etc}`)
            exercises.list = data.value
        },

        async inspect (eve) {
            const exercise = exercises.exercise = exercises.list [eve.currentTarget.rowIndex-1]
            const res = await GET(`/exercises/${exercise.ID}?$select=descr,stock,image`)
            Object.assign (exercise, res.data)
            exercises.order = { quantity:1 }
            setTimeout (()=> $('form > input').focus(), 111)
        },

        async submitOrder () {
            const {exercise,order} = exercises, quantity = parseInt (order.quantity) || 1 // REVISIT: Okra should be less strict
            try {
                const res = await POST(`/submitOrder`, { quantity, exercise: exercise.ID })
                exercise.stock = res.data.stock
                exercises.order = { quantity, succeeded: `Successfully ordered ${quantity} item(s).` }
            } catch (e) {
                exercises.order = { quantity, failed: e.response.data.error ? e.response.data.error.message : e.response.data }
            }
        }

    }
}).mount('#app')

exercises.fetch() // initially fill list of exercises

document.addEventListener('keydown', (event) => {
    // hide user info on request
    if (event.key === 'u')  exercises.user = undefined
})

