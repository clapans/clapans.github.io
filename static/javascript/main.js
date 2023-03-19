let recent = document.querySelector(".recent")
let category = document.querySelector(".category")
let searchCandidate = document.querySelector("#searchCandidate")
let searchBarContainer = document.querySelector("#searchBarCtnr")
let body = document.querySelector(".whole")

body.addEventListener("click",() => {
  if (!searchCandidate.classList.contains("d-none")) {
    searchCandidate.classList.add("d-none")
    searchBarContainer.setAttribute("style","border-radius: 30px;")
  }
})

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

document.querySelector("#searchBar").addEventListener("input",(e) => getCandidate(e))
document.querySelector("#searchBar").addEventListener("click",() => {
  setTimeout(() => {
      if (searchCandidate.classList.contains("d-none") && document.querySelectorAll("#searchCandidate > div").length != 0) {
        searchCandidate.classList.remove("d-none")
        searchBarContainer.setAttribute("style","border-radius: 30px 30px 0px 0px; border-bottom : 0px")
      }
    },10) 
})

document.querySelector("#rc").addEventListener("click",() => {
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
})

let idx = 1
let writings = document.querySelectorAll(".write")
let page = document.querySelectorAll(".pageItem")

function settings(page) {
  for (let i = (page-1)*6; i < Math.min(writings.length,page*6); i++) {
    writings[i].classList.remove("d-none")
  }
  
  for (let i = 0; i < writings.length / 6; i++) {
    let tmp = document.createElement("div")
    tmp.classList.add("d-inline-block")
    tmp.classList.add("fw-bold")
    tmp.classList.add("mx-2")
    tmp.classList.add("pageItem")
    num = i + 1
    tmp.innerText = num
    tmp.setAttribute("id","page" + num)
    if (i == (page-1)) tmp.classList.add("activePage")
    if (i > 9) tmp.classList.add("d-none")
    document.querySelector(".paginates").appendChild(tmp)
  }
}

function changeIdx(num) {
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

if (sessionStorage.getItem("page") != null) 
  idx = parseInt(sessionStorage.getItem("page"))

settings(idx)

for (let i = 1; i < writings.length / 6 + 1; i++) {
  document.querySelector("#page" + i).addEventListener("click", () => {
    changeIdx(i)
  })
}

document.querySelector("#clickPre").addEventListener("click", () => {
  if (idx != 1) {
    if (idx % 10 == 1) {
      for (let i = idx - 10; i < idx; i++) 
        page[i - 1].classList.remove("d-none")
      for (let i = idx; i < Math.min(page.length + 1, idx + 10); i++) 
        page[i - 1].classList.add("d-none")
    }
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
    changeIdx(idx+1)
  }
})

document.querySelector(".totalWrite").innerText = writings.length

let aArr = document.querySelectorAll(".write > a")

for (let i = 0; i < aArr.length; i++) {
  aArr[i].addEventListener("click", () => {
    sessionStorage.setItem("page",parseInt(i/6) + 1)
  })
}