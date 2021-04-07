window.onbeforeunload = confirmExit;


function warnOnItemLevel0 () {


  var changedObjects = [];
  var errors = [];

  // inputs
  for (input of document.getElementsByTagName("input")){
    var changed = false;
    
    if (input.id != "") {
        switch (input.type) {
      case 'hidden':
      case 'text':
        if (input.value != input.defaultValue){
          changed = true;
        }
        break;
      case 'radio':
      case 'checkbox':
        if (input.checked != input.defaultChecked){
          changed = true;
        };
    }
    
    }
    
    if (changed){
      changedObjects.push(input);
    }
  } // inputs

  // textareas
  for (textarea of document.getElementsByTagName("textarea")){
    /*switch (textarea.classList[0]) {
        case 'rich_text_editor':
          if (textarea.parentNode.innerText != textarea.value){
            changedObjects.push(textarea);
          }
          break;
        default : 
        if (textarea.value != textarea.defaultValue){
            changedObjects.push(textarea);
          }
    }*/
    if (textarea.value != textarea.defaultValue){
            changedObjects.push(textarea);
          }
  } // textarea



  // Select Lists
  for (select of document.getElementsByTagName("select")){
    if (!select.options[select.selectedIndex].defaultSelected){
      changedObjects.push(select);
    }
  }
  // select

  for (item of changedObjects) {
      if (!apex.item(item.id).element[0].classList.value.includes("js-ignoreChange")) {
         errors.push( {
                      message: 'This item has unsaved changes',
                      location: "inline",
                      pageItem: item.id
                  } )
      } else {
        console.log('ignore change for '+item.id);
      }
  }
  apex.message.clearErrors();
  apex.message.showErrors( errors );

}

function warnOnItemLevel () {

  var errors = [];

  allItems = apex.page.forEachPageItem;
  allItems( $( "#wwvFlowForm" ), function( el, name ) {
          if (apex.item(name).isChanged() && !apex.item(name).element[0].classList.value.includes("js-ignoreChange")) {
            errors.push( {
                      message: 'This item has unsaved changes',
                      location: "inline",
                      pageItem: name
                  } )
          };
      }, true );
  
  apex.message.clearErrors();
  apex.message.showErrors( errors );

}

function confirmExit() { 
    if ( apex.page.isChanged()) {
      warnOnItemLevel();  
      return "You have attempted to leave this page.";
    }
}