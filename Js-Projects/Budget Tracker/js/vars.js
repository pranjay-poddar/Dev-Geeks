
// Variables around the applications
const option = document.getElementById('option')
const desc = document.getElementById('desc')
const amount = document.getElementById('amount')
const btn = document.querySelector('.submit')

// income
const iTotl = document.querySelector('.incTotal')
const iSum = document.querySelector('.incSum')

// expense
const exTotl = document.querySelector('.expTotal')
const exSum = document.querySelector('.expSum')

// balance
const balTotl = document.querySelector('.balSum')
const balPercnt = document.querySelector('.balPercent')

// list
const incomeList = document.querySelector('.incomeSummary')
const expenseList = document.querySelector('.expenseSummary')

// list children

const xList = document.querySelectorAll('.expenseSummary > li')


// label
const aLabel = document.querySelector('.amountLabel')
const dLabel = document.querySelector('.descLabel')

// bar
const bar = document.querySelector('.bar')

const dText = 'Please enter a description.'
const dTWarn = 'Enter any desciption!'

const aText = 'Enter an amount.'
const aTWarn = 'Please enter a valid amount!'



const message = (desc, el) => {
  desc === 'desc' ? el.textContent = dTWarn : desc === 'amount' ? el.textContent = aTWarn : null
  el.style.color = 'red'
  setTimeout(() => {
    desc === 'desc' ? el.textContent = dText : desc === 'amount' ? el.textContent = aText : null
    el.style.color = '#051e4c'
  }, 2500)
}

const display = (state) => {
  let i = state.income
  let x = state.expense
  let b = state.balance
  
  iTotl.textContent = i.total === 0 ? `$ 0.00` : `$ ${fNum(i.total)}`
  iSum.textContent = i.length == 0 ? 'No Income Yet' : `${i.length} Income Sources`

  exTotl.textContent = x.total === 0 ? `$ 0.00` : `$ - ${fNum(x.total)}`
  exSum.textContent = x.length == 0 ? 'No Income Yet' : `${x.length} Expense Items`

  balTotl.textContent = b.balance === 0 ? `$ 0.00` : `$ ${fNum(b.balance)}`
  balPercnt.textContent = b.percent === 0 ? `No Saving Yet` : `${b.percent}% Savings`


  bar.innerHTML = x.list.map(li => `
    <span class='spot' style="background-color: rgb(${li.color.r}, ${li.color.g}, ${li.color.b}); width: ${li.barPercent}%"></span>
  `).join('')

  if(i.list.length === 0){
    incomeList.innerHTML = `<li class='listIncome'>
                              <p class='empty'>No Income</p>
                            </li> `
  } else {
    incomeList.innerHTML = i.list.map(li => `
      <li class='listIncome'>
        <p class='desc'>${li.desc}</p>
        <p class='percent'>${li.percent}%</p>
        <p class='amount'>$ ${fNum(li.amount)}</p>
        <p class='close'>x</p>
      </li>
    `).join(''
    )

  }

  if(x.list.length == 0){
    expenseList.innerHTML = `<li class='listExpenses'>
                              <p class='empty'>No Expenses</p>
                            </li>`
  } else {
    expenseList.innerHTML = x.list.map(ex => `
    <li class='listExpenses' style="background-color: rgb(${ex.color.r}, ${ex.color.g}, ${ex.color.b})">
    <p class='desc'>${ex.desc}</p>
    <p class='percent'>${ex.percent}%</p>
    <p class='amount'>$ ${fNum(ex.amount)}</p>
    <p class='close'>x</p>
    </li>
    `).join('')
  }
}

const fNum = (n) => {
  return n.toLocaleString()
}