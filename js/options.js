// Saves options to browser.storage
function save_options() {
  save: {

    var DwnEnbl = document.getElementById('DwnEnbl').checked;
    var DwnBmVi = document.getElementById('DwnBmVi').checked;
    var DwnCount = document.getElementById('DwnCount').checked;
    var debug = document.getElementById('debug').checked;
    var pptc = document.getElementById('pptc').checked;
    var pptu = document.getElementById('pptu').value;
    var shwame = document.getElementById('shwame').checked;

    if (pptc == true && pptu == "") {
      document.getElementById('pptu').style.backgroundColor = "pink";
      break save;
    }

    browser.storage.local.set({
      DwnEnbl: DwnEnbl,
      DwnBmVi: DwnBmVi,
      DwnCount: DwnCount,
      debug: debug,
      pptc: pptc,
      pptu: pptu,
      shwame: shwame
    }, function () {
      // Update status to let user know options were saved.
      var status = document.getElementById('status');
      status.textContent = 'Options saved';
      setTimeout(function () {
        status.textContent = '';
      }, 1750);
    });
  }
}

// Restores checkboxs state using the preferences
// stored in browser.storage.
function restore_options() {
  browser.storage.local.get({
    DwnEnbl: true,
    DwnBmVi: false,
    DwnCount: true,
    DwnCountVal: 0,
    debug: false,
    pptc: false,
    pptu: "",
    shwame: true
  }, function (items) {
    document.getElementById('DwnEnbl').checked = items.DwnEnbl;
    document.getElementById('DwnBmVi').checked = items.DwnBmVi;
    document.getElementById('DwnCount').checked = items.DwnCount;
    document.getElementById('DwnCountVal').textContent = "(" + items.DwnCountVal + ")";
    document.getElementById('debug').checked = items.debug;
    document.getElementById('pptc').checked = items.pptc;
    document.getElementById('pptu').value = items.pptu;
    document.getElementById('shwame').checked = items.shwame;
  });


}
//reset download counter val
function reset() {
  browser.storage.local.set({
    DwnCountVal: 0
  }, function () {
    var status = document.getElementById('resetstatus');
    var dCounter = document.getElementById('DwnCountVal');
    dCounter.textContent = '(0)';
    status.textContent = 'Reseted!';
    setTimeout(function () {
      status.textContent = '';
    }, 1750);
  });
}
//show tip 1
function spoiler() {
  if (document.getElementById('spoiler').style.display == 'none') {
    document.getElementById('spoiler').style.display = '';
    document.getElementById('dospoiler').innerHTML = 'Hide';
  } else {
    document.getElementById('spoiler').style.display = 'none'
    document.getElementById('dospoiler').innerHTML = 'Show how';
  }
}
//show tip 2
function spoiler2() {
  if (document.getElementById('spoiler2').style.display == 'none') {
    document.getElementById('spoiler2').style.display = '';
    document.getElementById('dospoiler2').innerHTML = 'Hide';
  } else {
    document.getElementById('spoiler2').style.display = 'none'
    document.getElementById('dospoiler2').innerHTML = 'Show how';
  }
}
//white bg
function whitebg() {
  document.getElementById('pptu').style.backgroundColor = "transparent";

}

//eventListeners
document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click',
  save_options);
document.getElementById('reset').addEventListener('click',
  reset);
document.getElementById('pptu').addEventListener('click',
  whitebg);


