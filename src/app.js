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
    createProperty 
} from './propertyService.js'

console.log(await getProperties())
var propertyList = await getProperties()

const doc = {
    tbody: document.querySelector('#tbody'),
    aboutButton: document.querySelector('#aboutButton'),
    saveButton: document.querySelector('#saveButton')
}



var rows = ''
propertyList.forEach(prop => {
    var row = `
        <tr>
            <td>${prop.id}</td>
            <td>${prop.type}</td>
            <td>${prop.price}</td>
            <td>${prop.city}</td>
            <td>${prop.baseArea}</td>
        </tr>
    `
    rows += row
})
doc.tbody.innerHTML = rows

doc.aboutButton.addEventListener('click', () => {
    Swal.fire({
        title: 'Ingatlan',
        text: 'Erős István, IN, 2026-04-23'
    })
})

doc.saveButton.addEventListener('click', async () => {
    const property = {
        type: 'rent',
        price: 98,
        city: 'Pécs',
        baseArea: 59        
    }
    const res = await createProperty(property)
    console.log(res)
})

