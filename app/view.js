'use strict'
const path = require('path')
const model = require(path.join(__dirname, 'model.js'))

module.exports.showPeople = function (rowsObject) {
  let markup = ''
  for (let rowId in rowsObject) {
    let row = rowsObject[rowId]
    markup += '<div class="row justify-content-start">' +
    '<div class="col-xs-2 edit-icons"><a href="#"><img id="edit-pid_' +
    row.person_id + '" class="icon edit" src="' +
    path.join(__dirname, 'img', 'edit-icon.png') + '"></a>' +
    '<a href="#"><img id="del-pid_' + row.person_id +
    '" class="icon delete" src="' + path.join(__dirname, 'img', 'x-icon.png') +
    '"></a></div>' +
    '<div class="col-xs-5 name">' + row.last_name + ',&nbsp;</div>' +
    '<div class="col-xs-5 name">' + row.first_name + '</div>' +
    '</div>'
  }
  $('#add-person, #edit-person').hide()
  $('#people-list').html(markup)
  $('a.nav-link').removeClass('active')
  $('a.nav-link.people').addClass('active')
  $('#people').show()
  $('#people-list img.edit').each(function (idx, obj) {
    $(obj).on('click', function () {
      window.view.editPerson(this.id)
    })
  })
  $('#people-list img.delete').each(function (idx, obj) {
    $(obj).on('click', function () {
      window.view.deletePerson(this.id)
    })
  })
}

module.exports.listPeople = function (e) {
  $('a.nav-link').removeClass('active')
  $(e).addClass('active')
  $('#edit-person').hide()
  window.model.getPeople()
  $('#people').show()
}

module.exports.addPerson = function (e) {
  $('a.nav-link').removeClass('active')
  $(e).addClass('active')
  $('#people').hide()
  $('#edit-person h2').html('Add Person')
  $('#edit-person-submit').html('Save')
  $('#edit-person-form input').val('')
  $('#edit-person-form').removeClass('was-validated')
  $('#first_name, #last_name')
    .removeClass('is-valid is-invalid')
  $('#person_id').parent().hide()
  $('#edit-person').show()
}

module.exports.editPerson = function (pid) {
  $('#edit-person h2').html('Edit Person')
  $('#edit-person-submit').html('Update')
  $('#edit-person-form').removeClass('was-validated')
  $('#first_name, #last_name')
    .removeClass('is-valid is-invalid')
  $('#person_id').parent().show()
  pid = pid.split('_')[1]
  let row = model.getPerson(pid)[0]
  $('#person_id').val(row.person_id)
  $('#first_name').val(row.first_name)
  $('#last_name').val(row.last_name)
  $('#people, #add-person').hide()
  $('#edit-person').show()
}

module.exports.deletePerson = function (pid) {
  model.deletePerson(pid.split('_')[1], $('#' + pid).closest('div.row').remove())
}

module.exports.getFormFieldValues = function (formId) {
  let keyValue = {columns: [], values: []}
  $('#' + formId).find('input:visible, textarea:visible').each(function (idx, obj) {
    keyValue.columns.push($(obj).attr('id'))
    keyValue.values.push($(obj).val())
  })
  return keyValue
}
