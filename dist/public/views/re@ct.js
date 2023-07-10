console.log("Ey, it's me, your buddy Re@ct");

const root = document.getElementById("root");

if(root === null){
  throw new Error("Can't run re@act without a root");
}

root.append("Hello World!");

const wrapperDiv = document.createElement("div");
const innerDiv = document.createElement("div");
wrapperDiv.innerText = "Here are some random numbers:"
innerDiv.innerHTML = createRandomNumbers();

root.appendChild(wrapperDiv);
wrapperDiv.appendChild(innerDiv);

function createRandomNumbers(){
  const randomNumbers = new Array(10).fill("a").map((el) => {
    return `<p>${Math.floor(Math.random() * 1000)}</p>`
  })

  return randomNumbers.join("");
}