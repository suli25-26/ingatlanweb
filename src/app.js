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
    propertyForm: document.querySelector('#propertyForm')
}

doc.propertyForm.addEventListener('submit', (event) => {
    event.preventDefault()
    console.log('műkszik...')

    const propertyForm = new FormData(event.target)

    const property = {
        type: propertyForm.get('type'),
        price: propertyForm.get('price'),
        city: propertyForm.get('city'),
        baseArea: propertyForm.get('baseArea')
    }

    startSave(property)
})

function deleteOneProperty() {
    deleteProperty(id)
}

window.deleteOneProperty = deleteOneProperty

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
                <button onclick="deleteOneProperty()"
                class="btn btn-danger">
                Törlés
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
    propertyList.push(property)
    render()
    console.log(res)

}
function updateOneProperty() { }

