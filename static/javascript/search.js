titles = [
'가변인자와 오버로딩', '1106번 - 호텔','3085번 - 사탕 게임','3273번 - 두 수의 합',
'11497번 - 통나무 건너뛰기','클래스 메서드와 인스턴스 메서드','JVM 메모리 구조',
'17825번 - 주사위 윷놀이','클래스와 객체','1613번 - 역사','17837번 - 새로운 게임 2',
'서블릿-예제','서블릿','5525번 - IOIOI','1922번 - 네트워크 연결','1783번 - 병든 나이트'
]

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