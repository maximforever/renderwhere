console.log("Ey, it's me, your buddy Re@ct");

const root = document.getElementById("root");

if(root === null){
  throw new Error("Can't run re@act without a root");
}

const wrapperDiv = document.createElement("div");
const innerDiv = document.createElement("div");
const heading = document.createElement("h1");
const subheading = document.createElement("h3");
wrapperDiv.innerText = "Here are some random numbers:"
innerDiv.innerHTML = createRandomNumbers();
heading.innerText = "Client side rendering"
subheading.innerText = "The following numbers were generated on the server"

root.appendChild(heading);
root.appendChild(subheading);
root.appendChild(wrapperDiv);
wrapperDiv.appendChild(innerDiv);

function createRandomNumbers(){
  const randomNumbers = new Array(10).fill("a").map((el) => {
    return `<p>${Math.floor(Math.random() * 1000)}</p>`
  })

  return randomNumbers.join("");
}