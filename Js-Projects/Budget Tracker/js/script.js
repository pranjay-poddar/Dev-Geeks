
class Budget{

  constructor(state){
    this.state = state
    this.add = this.add()
    this.display = this.showDisp()
  }

  setState(newState) {
    this.state = { ...this.state, ...newState }
  }

  add(){
    btn.addEventListener('click', ()=>{
      let dVal = desc.value
      let aVal = Number(amount.value)
      if(dVal === '') {
        message('desc', dLabel) 
        return
      }
      if(isNaN(aVal) || aVal === ''){
        message('amount', aLabel)
        return
      }
      
      desc.value = ''
      amount.value = ''
      option.value === 'income' ? this.calculator('income', dVal, aVal) : 
        this.calculator('expense', dVal, aVal)
    })
  }
    
  deleteList(){
    const listClicked = document.querySelectorAll('.close')

    listClicked.forEach(li => {
      li.addEventListener('click', () =>{
        let listName = li.parentElement.classList.value
        let liName = li.parentElement.firstElementChild.textContent
        this.removeList(listName, liName)
      })
    })
  }

  
  removeList(name, liDesc){
    let sec;
    let s;
    if(name == 'listIncome'){
      sec = this.state.income
      s = 'income'
    } else  if(name == 'listExpenses'){
      sec = this.state.expense
      s = 'expense'
    }
    this.r(sec, liDesc, s)
  }

  r(liState, name, stateName){
    if(stateName == 'income'){
      let s1 = liState.list.filter(li => li.desc != name )
      this.stateCalc(s1, totalCalc(0, s1), stateName )
    } else if (stateName == 'expense'){
      let s1 = liState.list.filter(li => li.desc != name )
      this.stateCalc(s1, totalCalc(0, s1), 'expense')
    }
    this.balanceCalc()
    this.showDisp()
  }


  calculator(title, desc, amount){
    let lists;
    title === 'income' ? lists = this.state.income.list : title === 'expense' ?
      lists = this.state.expense.list : null

    if(lists.length == 0){
      let list = []
      list.push(this.listCreate(amount, desc, title))
      this.stateCalc(list, amount, title)
      this.bPerCalc()
    } else {
      let total = totalCalc(amount, lists);
      let newList = lists
      let list = this.listCreate(amount, desc, title)
      newList.push(list)
    
      // update percent
      newList.map(list => {
        list.percent = percentCalc(total, list.amount)
      })

      this.stateCalc(newList, total, title)
      this.bPerCalc()
    }
  }

  listCreate(amount, desc, title){
    let list;
      if(title === 'income'){
        list = {
          amount: amount,
          desc: desc,
          percent: percentCalc(amount, amount)
        }
      } else {
        list = {
          amount: amount,
          color: title === 'expense' ? {
            r: numGen(),
            g: numGen(),
            b: numGen(),
          } : null,
          barPercent: 0,
          desc: desc,
          percent: percentCalc(amount, amount)
        }
      }
    return list
  }


  bPerCalc(){
    let inc = this.state.income
    let x = this.state.expense
    let bar = x.list
    
    bar.map((b, i )=> {
      if(x.total > inc.total){
        let total = totalCalc(0, bar)
        b.barPercent = percentCalc(total, b.amount)
      } else if (inc.total > x.total){
        b.barPercent = percentCalc(inc.total, b.amount)
      }
    })
    this.stateCalc(bar, x.total,'expense')
    this.balanceCalc()
    this.showDisp()
  }

  stateCalc(lists, total, title){
    // console.log(lists, total, title)
    let state = {
      total: total,
      list: lists,
      length: lists.length
    }
    if(title === 'income') this.setState({income: state})
    if(title === 'expense') this.setState({expense: state})
  }

  balanceCalc(){
    let inTotal = this.state.income.total
    let exTotal = this.state.expense.total
    let balance = {
      balance: inTotal - exTotal,
      percent: percentCalc(inTotal, inTotal - exTotal)
    }
    this.setState({balance: balance})
  }
  
  showDisp(){
    display(this.state)
    this.deleteList()
  }
}

const bPerCalc = (xTot, a, iTot) => {
    let n
    if(xTot > iTot){
        n = percentCalc(xTot, a)
    } else {
        n = percentCalc(iTot, a)
    }
    return n
}

const numGen = () => {
  return Math.floor((Math.random() * 60) + 180 ) + 1
}


const totalCalc = (amount, lists) => {
  let t = 0
  lists.map(list => {
    t += list.amount;
  })
  return t + amount
}


const percentCalc = (total, amount) => {
  let n = Number(amount / total * 100)
  return Number(n.toFixed(2))
}

class Income{
  constructor(income, expense, balance){
    this.income = income
    this.expense = expense
    this.balance = balance
  }

  static income(){
    return {
      total: 0,
      list: [],
      length: 0
    }
  }

  static expense() {
    return {
      total: 0,
      list: [],
      length: 0
    }
  }

  static balance(){
    return {
      percent: 0,
      balance: 0
    }
  }

  static ready(){
    return new Income(this.income(), this.expense(), this.balance())
  }
}

const start = new Budget(Income.ready())
