let titles = []

document.querySelectorAll(".write > a").forEach(title => {
  titles.push(title.innerText)
})

const searchArticle = (payload) => {
  let maxRes = 0
  let strRes = []
  for (const title of titles) {
    let dp = []
    let ti = ""
    for (let i = 0; i < title.length; i++){
      ti += title[i]
    }

    ti = ti.toUpperCase()
    payload = payload.toUpperCase()
    for (let i = 0; i < payload.length + 1; i++){
      let tmp = []
      for (let j = 0; j < title.length + 1; j++){
        tmp.push(0)
      }
      dp.push(tmp)
    }

    for (let i = 1; i < payload.length + 1; i++){
      for (let j = 1; j < title.length + 1; j++){
        if (payload[i-1] === title[j-1]){
          dp[i][j] = dp[i-1][j-1] + 1
        } else {
          dp[i][j] = Math.max(dp[i-1][j],dp[i][j-1])
        }
      }
    }
    let max_ = 0
    for (let i = 0; i < payload.length + 1; i++){
      for (let j = 0; j < title.length + 1; j++){
        if (dp[i][j] > max_) {
          max_ = dp[i][j]
        }
      }
    }

    if (max_ > maxRes) {
      strRes = [title]
      maxRes = max_
    } else if (max_ === maxRes) {
      strRes.push(title)
    }
  }
  if (maxRes === 0) strRes = []
  return strRes
}