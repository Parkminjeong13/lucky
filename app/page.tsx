'use client'
import React, {useState} from 'react';
interface contentInter {
  name: string;
  desc : string;
  keyword ?: string;
  index ?: string
}
interface today{
  title: string;
  date: string;
  content: contentInter[]
}

export default function Home() {
  const [gender, setGender] = useState<string>("");
  const [birthDate, setBirthDate] = useState<string>("");
  const [month, setMonth] = useState<string>("1");
  const [time, setTime] = useState<string>("");

  const[resultToday,setResultToday] = useState<today | null>(null);
  const [resultTomorrow, setResultTomorrow] = useState(null);
  const [resultMonth, setResultMonth] = useState(null);
  

  const fetchData = async () =>{
    const res = await fetch(`/api?gender=${gender}&birthDate=${birthDate}&month=${month}&time=${time}`);
    const data = await res.json();
    setResultToday(data.result.day);
    setResultTomorrow(data.result.tomorrow);
    setResultMonth(data.result.month);
    console.log(data.result.day)
    console.log(data.result.tomorrow)
    console.log(data.result.month)
  }

  const birthChange = ((e : React.ChangeEvent<HTMLInputElement>)=>{
    const value = e.target.value;
    if(value.length <= 8 && /^[0-9]*$/.test(value)){
      setBirthDate(value)
    }
  })
  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen py-2 px-4 md:px-0">
        <h3 className='text-3xl font-bold mb-4'>오늘의 운세</h3>
        <div className="p-6 bg-white rounded-lg shadow-lg w-full max-w-lg">
          <div className="flex flex-col md:flex-row mb-4 items-center">
            <span className='mb-2 md:mb-0 md:w-2/5 text-xl'>성별 : </span>
            <div className="w-full flex">
              <button className={`${gender === "m" ? 'bg-blue-500 hover:bg-blue-400 text-white' : ''} rounded-md px-4 py-2 w-1/2`} onClick={() => setGender("m")}>남자</button>
              <button className={`${gender === "f" ? 'bg-pink-500 hover:bg-pink-400 text-white' : ''} rounded-md px-4 py-2 w-1/2`} onClick={() => setGender("f")}>여자</button>
            </div>
          </div>
          <div className="flex flex-col md:flex-row mb-4 items-center">
            <span className='mb-2 md:mb-0 md:w-2/5 text-xl'>생년월일 : </span>
            <input className="border w-full p-2 rounded-lg" type="text" onChange={birthChange} value={birthDate} placeholder='생년월일(8자리)' />
          </div>
          <div className="flex flex-col md:flex-row mb-4 items-center">
            <span className='mb-2 md:mb-0 md:w-2/5 text-xl'>달 : </span>
            <select className="border w-full p-2 rounded-lg" value={month} onChange={(e) => setMonth(e.target.value)}>
              <option value="1">양력</option>
              <option value="2">음력 평달</option>
              <option value="3">음력 윤달</option>
            </select>
          </div>
          <div className="flex flex-col md:flex-row mb-4 items-center">
            <span className='mb-2 md:mb-0 md:w-2/5 text-xl'>시간 : </span>
            <select className="border w-full p-2 rounded-lg" value={time} onChange={(e) => setTime(e.target.value)}>
              <option value="">모름</option>
              <option value="0">23:30 ~ 01:29</option>
              <option value="1">01:30 ~ 03:29</option>
              <option value="2">03:30 ~ 05:29</option>
              <option value="3">05:30 ~ 07:29</option>
              <option value="4">07:30 ~ 09:29</option>
              <option value="5">09:30 ~ 11:29</option>
              <option value="6">11:30 ~ 13:29</option>
              <option value="7">13:30 ~ 15:29</option>
              <option value="8">15:30 ~ 17:29</option>
              <option value="9">17:30 ~ 19:29</option>
              <option value="10">19:30 ~ 21:29</option>
              <option value="11">21:30 ~ 23:29</option>
            </select>
          </div>
          <button className='bg-gray-500 hover:bg-gray-400 text-white px-4 py-2 rounded-lg w-full' onClick={fetchData}>확인</button>
          {resultToday && (
            <div className="mt-6">
              <h2 className="text-xl font-bold text-gray-800">{resultToday.title}</h2>
              <p className="text-gray-600">{resultToday.date}의 운세입니다.</p>
              {resultToday.content.map((item, idx) => (
                <div key={idx} className="mt-6">
                  <h3 className='text-lg font-semibold text-gray-800 mb-2'>{item.name}</h3>
                  <p className="text-gray-600">{item.desc}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  )
}
