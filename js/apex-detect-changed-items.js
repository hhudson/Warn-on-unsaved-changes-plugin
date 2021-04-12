var changedObjects = [];

allItems = apex.page.forEachPageItem;
allItems(
  $("#wwvFlowForm"),
  function (el, name) {
    if (
      apex.item(name).isChanged() &&
      !apex.item(name).element[0].classList.value.includes("js-ignoreChange")
    ) {
      changedObjects.push(el);
    }
  },
  true
);

console.log("Changed", changedObjects);
apex - detect - changed - items;
