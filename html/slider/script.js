let index = 0;
const imageSize = 4;

function display(val) {
  const newIndex = index + val;
  console.log(newIndex);
  if(newIndex < 0 || newIndex > imageSize - 1)
    return;
  // document.getElementById('image-comp_'+index).classList.add("hide");
  // document.getElementById('image-comp_'+newIndex).classList.remove("hide");
  const transformVal = newIndex * 420;
  document.getElementById('img-cont').style.transform = "translate(-" + transformVal + "px)";
  document.getElementById('img-cont').style.transition = "all 1s linear";
  index = newIndex;
}
