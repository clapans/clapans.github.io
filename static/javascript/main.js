let recent = document.querySelector(".recent")
let category = document.querySelector(".category")
let searchCandidate = document.querySelector("#searchCandidate")
let searchBarContainer = document.querySelector("#searchBarCtnr")
let body = document.querySelector(".whole")
let categoryItem = document.querySelectorAll(".category-item")
let idx = 1
let writings = document.querySelectorAll(".write")
let page = document.querySelectorAll(".pageItem")

document.querySelector(".select-filter").addEventListener("click",() => {
  let filterLst = []
  
  for (let el of document.querySelectorAll(".addFilter"))
    filterLst.push(el.innerText)
  
  sessionStorage.setItem("filter",JSON.stringify(filterLst))
  setFilter(filterLst,"click")
})

console.log(sessionStorage.get)
body.addEventListener("click",() => {
  if (!searchCandidate.classList.contains("d-none")) {
    searchCandidate.classList.add("d-none")
    searchBarContainer.setAttribute("style","border-radius: 30px;")
  }
})

for (let item of categoryItem)
  item.addEventListener("click",() => {
    if (item.classList.contains("addFilter"))
      item.classList.remove("addFilter")
    else
      item.classList.add("addFilter")
  })

function setFilter(filterLst,str) {
  writings = []
  for (let el of document.querySelectorAll(".write")) 
    if (isIncludeFilter(el,filterLst))
      writings.push(el)

  if (str === "not")
    for (let el of document.querySelectorAll(".category-item")) 
      if (isIncludeLst(el,filterLst))
        el.classList.add("addFilter")

  if (str === "click") {
    settings(1)
    changeSession(1)
    changeIdx(1)
    setTotalPost()
  }
}

function isIncludeFilter(el,lst) {
  if (lst.length === 0)
    return true
  for (let t of lst) 
    if (el.classList.contains(t))
      return true
  return false
}

function isIncludeLst(el,lst) {
  for (let t of lst) 
    if (el.innerText === t)
      return true
  return false
}

function getCandidate(e) {
  if (!searchCandidate.classList.contains("d-none"))
    searchCandidate.classList.add("d-none")
  searchBarContainer.setAttribute("style","border-radius: 30px;")
  while (searchCandidate.hasChildNodes()) 
    searchCandidate.removeChild(searchCandidate.firstChild );       

  for (let candidate of searchArticle(e.target.value)) {
    let tmp = document.createElement('div')
    tmp.setAttribute("style","padding-left : 20px; height : 40px; line-height : 40px")
    tmp.classList.add("search-item")
    tmp.innerText = candidate
    searchCandidate.appendChild(tmp)
  }

  if (document.querySelectorAll("#searchCandidate > div").length != 0) {
    searchCandidate.classList.remove("d-none")
    searchBarContainer.setAttribute("style","border-radius: 30px 30px 0px 0px; border-bottom : 0px")
  }
}

function setTotalPost() {
  document.querySelector(".totalWrite").innerText = writings.length + ' 개'
}

document.querySelector("#searchBar").addEventListener("input",(e) => getCandidate(e))
document.querySelector("#searchBar").addEventListener("click",() => {
  setTimeout(() => {
      if (searchCandidate.classList.contains("d-none") && document.querySelectorAll("#searchCandidate > div").length != 0) {
        searchCandidate.classList.remove("d-none")
        searchBarContainer.setAttribute("style","border-radius: 30px 30px 0px 0px; border-bottom : 0px")
      }
    },10) 
})

/*document.querySelector("#rc").addEventListener("click",() => {
  if (recent.classList.contains("d-none")) {
    category.classList.add("d-none")
    recent.classList.remove("d-none")
  }
  if (document.querySelector("#rc").classList.contains("deactive-page")) {
    document.querySelector("#rc").classList.remove("deactive-page")
    document.querySelector("#ct").classList.add("deactive-page")
  }
})

document.querySelector("#ct").addEventListener("click",() => {
  if (category.classList.contains("d-none")) {
    recent.classList.add("d-none")
    category.classList.remove("d-none")
  }

  if (document.querySelector("#ct").classList.contains("deactive-page")) {
    document.querySelector("#ct").classList.remove("deactive-page")
    document.querySelector("#rc").classList.add("deactive-page")
  }
})*/

function settings(page) {
  for (let el of document.querySelectorAll(".write"))
    if (!el.classList.contains("d-none"))
      el.classList.add("d-none")
  
  for (let i = (page-1)*6; i < Math.min(writings.length,page*6); i++) {
    if (writings[i].classList.contains("d-none"))
      writings[i].classList.remove("d-none")
  }
  
  for (let i = 0; i < writings.length; i++) {
    writings[i].addEventListener("click", () => { 
      sessionStorage.setItem("page",parseInt(i/6) + 1)
    })
  }
  
  let paginates = document.querySelector(".paginates")
  while (paginates.hasChildNodes()) 
    paginates.removeChild(paginates.firstChild); 

  if (writings.length === 0)
    return
  
  for (let i = 0; i < writings.length / 6; i++) {
    let tmp = document.createElement("div")
    tmp.classList.add("d-inline-block")
    tmp.classList.add("fw-bold")
    tmp.classList.add("mx-2")
    tmp.classList.add("pageItem")
    num = i + 1
    tmp.innerText = num
    tmp.setAttribute("id","page" + num)
    tmp.addEventListener("click", () => {
      changeSession(i+1)
      changeIdx(i+1)
    })
    if (i == (page-1)) tmp.classList.add("activePage")
    if (i > 9) tmp.classList.add("d-none")
    paginates.appendChild(tmp)
  }

  for (let i = 1; i < writings.length / 6 + 1; i++) {
    document.querySelector("#page" + i).addEventListener("click", () => {
      changeSession(i)
      changeIdx(i)
    })
  }
}

function changeIdx(num) {
  if (writings.length === 0)
    return
  let tmp = document.querySelectorAll(".pageItem")
  for (let i = 0; i < tmp.length; i++) {
    if (tmp[i].classList.contains("activePage"))
      tmp[i].classList.remove("activePage")
  }
  document.querySelector("#page" + num).classList.add("activePage");
  for (let i = 6*(idx-1); i < Math.min(writings.length,6*idx); i++) {
    writings[i].classList.add("d-none")
  }
  idx = num;
  for (let i = 6*(idx-1); i < Math.min(writings.length,6*idx); i++) {
    writings[i].classList.remove("d-none")
  }
}

function changeSession(num) {
  if (sessionStorage.getItem("page") != null) 
      sessionStorage.setItem("page", num)
}

if (sessionStorage.getItem("page") != null) 
  idx = parseInt(sessionStorage.getItem("page"))
else
  sessionStorage.setItem("page",1)

if (sessionStorage.getItem("filter") != null) {
  setFilter(JSON.parse(sessionStorage.getItem("filter")),"not")
}

settings(idx)

document.querySelector("#clickPre").addEventListener("click", () => {
  if (idx != 1) {
    if (idx % 10 == 1) {
      for (let i = idx - 10; i < idx; i++) 
        page[i - 1].classList.remove("d-none")
      for (let i = idx; i < Math.min(page.length + 1, idx + 10); i++) 
        page[i - 1].classList.add("d-none")
    }
    changeSession(sessionStorage.getItem("page") - 1)
    changeIdx(idx-1)
  }
})

document.querySelector("#clickNext").addEventListener("click", () => {
  if (idx != parseInt(writings.length / 6) + 1) {
    if (idx % 10 == 0) {
      for (let i = idx + 1; i < Math.min(page.length + 1, idx + 11); i++) 
        page[i - 1].classList.remove("d-none")
      for (let i = idx - 9; i < idx + 1; i++) 
        page[i - 1].classList.add("d-none")
    }
    changeSession(sessionStorage.getItem("page") + 1)
    changeIdx(idx+1)
  }
})

setTotalPost()