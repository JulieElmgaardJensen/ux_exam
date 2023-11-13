
function burger_menu_dropdown() {
    // Find the div from ID
    var dropdown_menu = document.getElementById("dropdown_menu");
    
    // If the style of the div is block hide it
    if (dropdown_menu.style.display === "block") {
      dropdown_menu.style.display = "none";
    } 
    // If the style of the div isn't block show it
    else {
      dropdown_menu.style.display = "block";
    }
  }