function save_options() {
  var file_name = document.getElementById('file_name').value;
  var save_by_date = document.getElementById('save_by_date').checked;
  chrome.storage.sync.set({
    file_name: file_name,
    save_by_date: save_by_date
  }, function() {
    // Update status to let user know options were saved.
    var status = document.getElementById('status');
    status.textContent = 'Settings saved.';
    setTimeout(function() {
      status.textContent = '';
    }, 750);
  });
}


function restore_options() {
  chrome.storage.sync.get({
    file_name: '',
    save_by_date: false
  }, function(items) {
    document.getElementById('file_name').value = items.file_name;
    document.getElementById('save_by_date').checked = items.save_by_date;
  });
}
document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click',
    save_options);