import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.scss';
import { SliderItemBlock } from './SliderItemBlock/SliderItemBlock';
import { ItemSum } from './ItemSum/ItemSum';
import { Button } from './Button/Button';
import axios from 'axios';
import { requestAPI } from './api';


function App() {

  const [price, setPrice] = useState(3300000)
  const [contribution, setContribution] = useState(420000)
  const [period, setPeriod] = useState(60)

  const [leasingAmount, setLeasingAmount] = useState(4467313)
  const [monthlyPayment, setMonthlyPayment] = useState(114455)

  const [loading, setLoading] = useState(false)
  const [percent, setPercent] = useState(10)

  const [minPerc, setMinPerc] = useState(0)
  const [maxPerc, setMaxPerc] = useState(0)

  const monthPay = (price - contribution)
    * ((0.035 * Math.pow((1 + 0.035), period))
      / (Math.pow((1 + 0.035), period) - 1));

  //monthPay - 36080
  useEffect(() => {
    setMinPerc(Math.round(price * 0.1))
    setMaxPerc(Math.round(price * 0.6))

    const mathPerc = Math.round(contribution / (price / 10) * 10);
    setPercent(mathPerc)

    setLeasingAmount(contribution + period * monthlyPayment)

    setMonthlyPayment(Math.round(monthPay))
  }, [price, contribution, percent, period, monthlyPayment, monthPay])


  const request = async () => {
    setLoading(true)
    try {
      const res = await requestAPI(price, contribution, period, leasingAmount, percent)

      console.log(res)
    }
    catch (e: any) {
      console.log(e);
    }
    finally {
      setLoading(false)
    }
  }

  if (contribution < Math.round(price * (10 / 100))) {
    const minCont = Math.round(price * (10 / 100))
    setContribution(minCont)
  }
  if (contribution > Math.round(price * (60 / 100))) {
    const minCont = Math.round(price * (60 / 100))
    setContribution(minCont)
  }



  return (
    <div className="App">

      <h1>Рассчитайте стоимость автомобиля в лизинг</h1>

      <div className="sliderItem">
        <SliderItemBlock
          title={'Стоимость автомобиля'}
          state={price}
          setState={setPrice}
          min={1000000}
          max={6000000}
          item={'₽'}
        />
        <SliderItemBlock
          title={'Первоначальный взнос'}
          state={contribution}
          setState={setContribution}
          min={minPerc}
          max={maxPerc}
          item={`${percent}%`}
          backgroundForItem
        />
        <SliderItemBlock
          title={'Срок лизинга'}
          state={period}
          setState={setPeriod}
          min={1}
          max={60}
          item={'мес.'}
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
