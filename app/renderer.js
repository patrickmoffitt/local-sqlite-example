'use strict'

const fs = require('fs')
const path = require('path')
const app = require('electron').remote.app
const cheerio = require('cheerio')

window.$ = window.jQuery = require('jquery')
window.Tether = require('tether')
window.Bootstrap = require('bootstrap')

let webRoot = path.dirname(__dirname)
window.view = require(path.join(webRoot, 'view.js'))
window.model = require(path.join(webRoot, 'model.js'))
window.model.db = path.join(app.getPath('userData'), 'example.db')

// Compose the DOM from separate HTML concerns; each from its own file.
let htmlPath = path.join(app.getAppPath(), 'app', 'html')
let body = fs.readFileSync(path.join(htmlPath, 'body.html'), 'utf8')
let navBar = fs.readFileSync(path.join(htmlPath, 'nav-bar.html'), 'utf8')
let menu = fs.readFileSync(path.join(htmlPath, 'menu.html'), 'utf8')
let people = fs.readFileSync(path.join(htmlPath, 'people.html'), 'utf8')
let editPerson = fs.readFileSync(path.join(htmlPath, 'edit-person.html'), 'utf8')

let O = cheerio.load(body)
O('#nav-bar').append(navBar)
O('#menu').append(menu)
O('#people').append(people)
O('#edit-person').append(editPerson)

// Pass the DOM from Cheerio to jQuery.
let dom = O.html()
$('body').html(dom)

$('document').ready(function () {
  window.model.getPeople()
  $('#edit-person-submit').click(function (e) {
    e.preventDefault()
    let ok = true
    $('#first_name, #last_name').each(function (idx, obj) {
      if ($(obj).val() === '') {
        $(obj).parent().removeClass('has-success').addClass('has-error')
        ok = false
      } else {
        $(obj).parent().addClass('has-success').removeClass('has-error')
      }
    })
    if (ok) {
      let formId = $(e.target).parents('form').attr('id')
      let keyValue = window.view.getFormFieldValues(formId)
      window.model.saveFormData('people', keyValue, function () {
        window.model.getPeople()
      })
    }
  })
})
