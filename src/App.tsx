import React, { useEffect, useState } from 'react';
import './App.scss';
import { SliderItemBlock } from './SliderItemBlock/SliderItemBlock';
import { ItemSum } from './ItemSum/ItemSum';
import { Button } from './Button/Button';
import { requestAPI } from './api';
import { numbFmt, strFmt } from './utils/formatСonversion';


function App() {

  const [price, setPrice] = useState(strFmt(3300000))
  const [contribution, setContribution] = useState(strFmt(420000))
  const [period, setPeriod] = useState(strFmt(12))

  const [leasingAmount, setLeasingAmount] = useState(strFmt(4467313))
  const [monthlyPayment, setMonthlyPayment] = useState(strFmt(114455))

  const [loading, setLoading] = useState(false)
  const [percent, setPercent] = useState(strFmt(10))

  const [minPerc, setMinPerc] = useState(0)
  const [maxPerc, setMaxPerc] = useState(0)

  const monthPay = (numbFmt(price) - numbFmt(contribution))
    * ((0.035 * Math.pow((1 + 0.035), numbFmt(period)))
      / (Math.pow((1 + 0.035), numbFmt(period)) - 1));

  useEffect(() => {
    setMinPerc(Math.round(numbFmt(price) * 0.1))
    setMaxPerc(Math.round(numbFmt(price) * 0.6))

    const mathPerc = Math.round(numbFmt(contribution) / (numbFmt(price) / 10) * 10);

    setPercent(strFmt(mathPerc))
    const leasingAmountStr = numbFmt(contribution) + numbFmt(period) * numbFmt(monthlyPayment)
    setLeasingAmount(strFmt(leasingAmountStr))

    const monthlyPaymentStr = Math.round(monthPay)
    setMonthlyPayment(strFmt(monthlyPaymentStr))
  }, [price, contribution, percent, period, monthlyPayment, monthPay])


  const request = async () => {
    setLoading(true)
    try {
      const res = await requestAPI(
        numbFmt(price),
        numbFmt(contribution),
        numbFmt(period),
        numbFmt(leasingAmount),
        numbFmt(percent)
      )

      console.log(res)
    }
    catch (e: any) {
      console.log(e);
    }
    finally {
      setLoading(false)
    }
  }

  // if (contribution < Math.round(price * (10 / 100))) {
  //   const minCont = Math.round(price * (10 / 100))
  //   setContribution(minCont)
  // }
  // if (contribution > Math.round(price * (60 / 100))) {
  //   const minCont = Math.round(price * (60 / 100))
  //   setContribution(minCont)
  // }



  return (
    <div className="App">

      <h1>Рассчитайте стоимость автомобиля в лизинг</h1>

      <div className="sliderItem">
        <SliderItemBlock
          title={'Стоимость автомобиля'}
          state={numbFmt(price)}
          setState={setPrice}
          min={1000000}
          max={6000000}
          item={'₽'}
          maxLengthInput={9}
        />
        <SliderItemBlock
          title={'Первоначальный взнос'}
          state={numbFmt(contribution)}
          setState={setContribution}
          min={minPerc}
          max={maxPerc}
          item={`${percent}%`}
          backgroundForItem
          maxLengthInput={9}
        />
        <SliderItemBlock
          title={'Срок лизинга'}
          state={numbFmt(period)}
          setState={setPeriod}
          min={1}
          max={60}
          item={'мес.'}
          maxLengthInput={2}
        />
      </div>

      <div className="item">
        <ItemSum
          title='Сумма договора лизинга'
          state={leasingAmount}
          setState={setLeasingAmount}
        />
        <ItemSum
          title='Ежемесячный платеж от'
          state={monthlyPayment}
          setState={setMonthlyPayment}
        />
        <Button
          title='Оформить заявку'
          loading={loading}
          request={request}
        />
      </div>
    </div>
  );
}

export default App;
