/*
* File: app.js
* Author: Erős István
* Copyright: 2026, Erős István
* Group: Szoft IN
* Date: 2026-04-23
* Github: https://github.com/eros12345/
* Licenc: MIT
*/

import * as bootstrap from 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import './style.css'
import Swal from 'sweetalert2'

import {
    getProperties,
    createProperty,
    deleteProperty
} from './propertyService.js'

// deleteProperty(13)

console.log(await getProperties())
var propertyList = await getProperties()

const doc = {
    tbody: document.querySelector('#tbody'),
    aboutButton: document.querySelector('#aboutButton'),
    propertyForm: document.querySelector('#propertyForm'),
    closeButton: document.querySelector('#closeButton')
}

doc.closeButton.addEventListener('click', () => {
    doc.propertyForm.reset()
}) 

doc.propertyForm.addEventListener('submit', (event) => {
    event.preventDefault()
    console.log('műkszik...')

    const propertyForm = new FormData(event.target)

    const property = {
        id: Number(propertyForm.get('id')),
        type: propertyForm.get('type'),
        price: Number(propertyForm.get('price')),
        city: propertyForm.get('city'),
        baseArea: Number(propertyForm.get('baseArea'))
    }

    startSave(property)
})

function deleteOneProperty(id) {
    deleteProperty(id)
    propertyList = propertyList.filter(prop => prop.id !== id)
    render()
}

window.deleteOneProperty = deleteOneProperty
window.editProperty = editProperty

function render() {
    var rows = ''
    propertyList.forEach(prop => {
        var row = `
        <tr>
            <td>${prop.id}</td>
            <td>${prop.type}</td>
            <td>${prop.price}</td>
            <td>${prop.city}</td>
            <td>${prop.baseArea}</td>
            <td>
                <button onclick="deleteOneProperty(${prop.id})"
                class="btn btn-danger">
                Törlés
                </button>

                <button onclick="editProperty(this)"
                data-bs-toggle="modal" data-bs-target="#exampleModal"
                class="btn btn-success"
                data-id="${prop.id}"
                data-type="${prop.type}"
                data-price="${prop.price}"
                data-city="${prop.city}"
                data-baseArea="${prop.baseArea}"
                >
                    Szerkesztés
                </button>
            </td>
        </tr>
    `
        rows += row
    })
    doc.tbody.innerHTML = rows
}

// window.addEventListener('load', () => {
//     render()
// })

render()

doc.aboutButton.addEventListener('click', () => {
    Swal.fire({
        title: 'Ingatlan',
        text: 'Erős István, IN, 2026-04-23'
    })
})

function startSave(property) {
    createNewProperty(property)
    
}
async function createNewProperty(property) {
    const res = await createProperty(property)
    propertyList.push(res)
    render()
    console.log(res)
    doc.propertyForm.reset()
}
function updateOneProperty() { }

function editProperty(e) {
    propertyForm.id.value = e.getAttribute('data-id')
    propertyForm.type.value = e.getAttribute('data-type')
    propertyForm.price.value = e.getAttribute('data-price')
    propertyForm.city.value = e.getAttribute('data-city')
    propertyForm.baseArea.value = e.getAttribute('data-baseArea')

}


