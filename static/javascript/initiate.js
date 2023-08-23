const writeContainer = document.querySelector(".write-container")
const categoryContainer = document.querySelector(".category-container")
const categorys = {
  ㄱ : new Set(),
  ㄴ : new Set(),
  ㄷ : new Set(),
  ㄹ : new Set(),
  ㅁ : new Set(),
  ㅂ : new Set(),
  ㅅ : new Set(),
  ㅇ : new Set(),
  ㅈ : new Set(),
  ㅊ : new Set(),
  ㅋ : new Set(),
  ㅌ : new Set(),
  ㅍ : new Set(),
  ㅎ : new Set()
}

for (let post of posts) {
  const wrpr = document.createElement("div")
  wrpr.classList.add("write")
  wrpr.classList.add("d-none")
  for (let category of post.category) {
    wrpr.classList.add(category.name)
    categorys[category.group].add(category.name)
  }
  
  const hr = document.createElement("hr")
  const a = document.createElement("a")
  const date = document.createElement("div")

  a.setAttribute("href",post.link)
  a.innerText = post.title

  date.classList.add("date")
  date.innerText = post.date

  wrpr.appendChild(hr)
  wrpr.appendChild(a)
  wrpr.appendChild(date)
  writeContainer.appendChild(wrpr)
}

for (let [key,value] of Object.entries(categorys)) {
  const el = document.createElement("div")
  el.classList.add("ps-3")
  const k = document.createElement("div")
  k.classList.add("category-key")
  k.classList.add("ps-3")
  const hr = document.createElement("hr")
  const tmp = document.createElement("div")
  k.innerText = key
  
  for (let category of Array.from(value).sort()) {
    const button = document.createElement("button")
    button.classList.add("category-item")
    button.innerText = category.replaceAll("_"," ")

    tmp.appendChild(button)
  }

  el.appendChild(k)
  el.appendChild(hr)
  el.appendChild(tmp)
  categoryContainer.appendChild(el)
}