import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Users, TrendingUp, ArrowLeft, User } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Cell } from 'recharts';

const images = {
  'ไปท์': '/images/pait.jpg',
  'วุฒิ': '/images/wuthi.jpg',
  'องุ่น': '/images/angoon.jpg',
  'อุ้ม': '/images/aum.jpg',
  'โอเว่น': '/images/owen.jpg',
  'ก็อต': '/images/got.jpg',
  'เกมส์': '/images/games.jpg',
  'เจษ': '/images/jess.jpg',
  'ทิพย์': '/images/tip.jpg',
  'ทิว': '/images/tew.jpg',
  'บูม': '/images/boom.jpg',
  'ใบตอง': '/images/baitong.jpg',
  'ปราย': '/images/prai.jpg',
  'อ๊อฟ': '/images/off.jpg',
  'เชอรี่': '/images/cherry.jpg',
  'เชอรรี่': '/images/cherry.jpg',
  'เบนซ์': '/images/benz.jpg',
  'พี่ยอด': '/images/yod.jpg',
  'บอส': '/images/boss.jpg',
  'อู๋': '/images/uu.jpg',
  'อู๋ (ปะจิ)': '/images/uu.jpg',
  'ปะจิ': '/images/uu.jpg',
};

const getImage = (name) => {
  for (let key in images) {
    if (name.includes(key) || key.includes(name)) return images[key];
  }
  return null;
};

const criteria = ['ด้านผลสัมฤทธิ์ของงาน','ความถูกต้องและคุณภาพของงาน','ความตรงต่อเวลาในการส่งมอบ','ความรับผิดชอบต่องาน','ด้านไหวพริบและทักษะ','การแก้ไขปัญหาเฉพาะหน้า','การเรียนรู้และความเข้าใจงาน','ความรอบคอบและลำดับความสำคัญ','การมีส่วนร่วม/นำเสนอแนวทาง','การทำงานร่วมกับทีม'];
const months = ['ม.ค.','ก.พ.','มี.ค.','เม.ย.','พ.ค.','มิ.ย.','ก.ค.','ส.ค.','ก.ย.','ต.ค.','พ.ย.','ธ.ค.'];
const teamSalesData = {
  'ทีมโอเว่น': [162084,138999,215911,100968,107570,236492,159750,199458,158166,195116,38369,63340],
  'ทีมวุฒิ': [1080394,835973,777258,736315,859789,676116,669166,562142,598512,678958,522061,370542],
  'ทีมเกมส์': [975975,1352726,1158208,1424212,1723713,1300450,1766279,1504554,1710253,1555223,1445062,1735642]
};

const teams = [
  { name: 'ทีมโอเว่น', leader: 'โอเว่น', color: '#3b82f6', hasSales: true, members: [
    { name: 'อู๋ (ปะจิ)', scores: [10,10,9,10,10,10,10,10,7,10], total: 96, review: 'โดยรวมทำงานได้ดี มีไหวพริบในการแก้ปัญหา' },
    { name: 'ใบตอง', scores: [10,9,9,10,9,9,10,8,8,10], total: 92, review: 'โดยรวมทำงานได้ดี รับผิดชอบงานที่มอบหมายได้ดี' },
    { name: 'บูม', scores: [10,9,9,10,8,6,7,7,5,10], total: 81, review: 'เขียนโค้ดกับทำสคริปต์ทำได้ดี มีไอเดียสร้างสรรค์' },
    { name: 'บอส', scores: [10,9,9,10,8,6,7,7,5,10], total: 81, review: 'เขียนโค้ดกับทำสคริปต์ทำได้ดี' },
    { name: 'เจษ', scores: [10,9,9,10,8,6,7,6,5,10], total: 80, review: 'มีไอเดียสร้างสรรค์ดี ทำงานที่มอบหมายได้ดี' },
    { name: 'ไปท์', scores: [6,6,6,6,5,5,5,4,4,8], total: 55, review: 'เรียนรู้ยังค่อนข้างช้า ต้องปรับปรุง' }
  ]},
  { name: 'ทีมวุฒิ', leader: 'วุฒิ', color: '#10b981', hasSales: true, members: [
    { name: 'ปราย', scores: [10,10,10,10,9,9,10,9,9,10], total: 96, review: 'งานที่ได้รับมอบหมายสามารถทำได้ค่อนข้างดี' },
    { name: 'ฟอร์ด', scores: [10,10,10,10,10,10,10,9,9,10], total: 98, review: 'การทำงานมีความละเอียดรอบคอบ เข้าใจงานได้ดี' }
  ]},
  { name: 'ทีมเกมส์', leader: 'เกมส์', color: '#a855f7', hasSales: true, members: [
    { name: 'อ๊อฟ', scores: [8,7,9,10,8,7,7,7,7,10], total: 80, review: 'ตอบลูกค้าพื้นฐานได้ดีมาก มีความทุ่มเท' },
    { name: 'องุ่น', scores: [9,8,10,10,9,9,9,10,9,10], total: 93, review: 'จัดการสินค้าบัญชี BM Nolimit ได้ดี' },
    { name: 'เบนซ์', scores: [10,9,10,10,10,10,10,10,10,10], total: 99, review: 'จัดการงานหลังบ้านได้ดีมาก' },
    { name: 'เชอรี่', scores: [8,7,10,10,7,7,7,7,7,10], total: 80, review: 'จัดการสินค้า Mbasic ได้ค่อนข้างดี' }
  ]},
  { name: 'ทีมก็อต', leader: 'ก็อต', color: '#f97316', hasSales: false, members: [
    { name: 'พี่ยอด', scores: [10,10,10,10,10,10,10,10,10,10], total: 87.5, review: 'ตัดคลิปเล่าสตอรี่ได้ดี' },
    { name: 'ทิพย์', scores: [8,8,9,10,8.5,9,9,8,9,9], total: 84.5, review: 'ทำงานกราฟิกได้ดี' },
    { name: 'อุ้ม', scores: [7.5,8,7,7.5,7.5,7,8,7.5,5,7], total: 72, review: 'ยังต้องพัฒนาในหลายด้าน' }
  ]},
  { name: 'ทีมทิว', leader: 'ทิว', color: '#f43f5e', hasSales: false, members: [
    { name: 'บอส', scores: [10,9,8,9.5,8,8,7,8,7,8], total: 82.5, review: 'ถนัด Automation และ Backend' },
    { name: 'บูม', scores: [10,9,8,10,9,9,10,8,8.5,8], total: 89.5, review: 'มีไหวพริบในการทำงานที่ดี' }
  ]}
];

const workMembers = [
  { name: 'น้ำ', team: 'MD', color: '#0d9488', years: 5, months: 8, salary: 43923, bonus: 219615 },
  { name: 'อิ่ม', team: 'Office', color: '#0d9488', years: 5, months: 6, salary: 32802, bonus: 164010 },
  { name: 'วุฒิ', team: 'หัวหน้าทีม', color: '#475569', years: 4, months: 4, salary: 21961, bonus: 87846 },
  { name: 'เกมส์', team: 'หัวหน้าทีม', color: '#475569', years: 3, months: 3, salary: 19965, bonus: 59895 },
  { name: 'ทิว', team: 'หัวหน้าทีม', color: '#475569', years: 2, months: 4, salary: 18150, bonus: 36300 },
  { name: 'โอเว่น', team: 'หัวหน้าทีม', color: '#475569', years: 2, months: 4, salary: 18150, bonus: 36300 },
  { name: 'ก็อต', team: 'หัวหน้าทีม', color: '#475569', years: 1, months: 10, salary: 16500, bonus: 16500 },
  { name: 'แมน', team: 'ทีมโอเว่น', color: '#3b82f6', years: 1, months: 9, salary: 15000, bonus: 15000, warning: true },
  { name: 'เชอรรี่', team: 'ทีมเกมส์', color: '#a855f7', years: 1, months: 8, salary: 16500, bonus: 16500 },
  { name: 'อ๊อฟ', team: 'ทีมเกมส์', color: '#a855f7', years: 1, months: 8, salary: 16500, bonus: 16500 },
  { name: 'ฟอร์ด', team: 'ทีมวุฒิ', color: '#10b981', years: 1, months: 4, salary: 10300, bonus: 10300 },
  { name: 'เบนซ์', team: 'ทีมเกมส์', color: '#a855f7', years: 1, months: 4, salary: 16500, bonus: 16500, warning: true },
  { name: 'ใบตอง', team: 'ทีมเกมส์', color: '#a855f7', years: 1, months: 4, salary: 16500, bonus: 16500 },
  { name: 'องุ่น', team: 'ทีมวุฒิ', color: '#10b981', years: 1, months: 0, salary: 15000, bonus: 7500 },
  { name: 'ทิพย์', team: 'ทีมก็อต', color: '#f97316', years: 0, months: 10, salary: 15000, bonus: 7500 },
  { name: 'เจษ', team: 'ทีมโอเว่น', color: '#3b82f6', years: 0, months: 10, salary: 15000, bonus: 7500 },
  { name: 'อุ้ม', team: 'ทีมก็อต', color: '#f97316', years: 0, months: 9, salary: 15000, bonus: 7500 },
  { name: 'บอส', team: 'ทีมทิว', color: '#f43f5e', years: 0, months: 9, salary: 15000, bonus: 7500 },
  { name: 'บูม', team: 'ทีมทิว', color: '#f43f5e', years: 0, months: 9, salary: 15000, bonus: 7500 },
];

const attendanceData = [
  { name: 'น้ำ', late: 0, lateMin: 0, sick: 1, personal: 2, absent: 0 },
  { name: 'อิ่ม', late: 0, lateMin: 0, sick: 3, personal: 11, absent: 0 },
  { name: 'วุฒิ', late: 132, lateMin: 2579, sick: 17, personal: 3, absent: 2 },
  { name: 'ทิว', late: 17, lateMin: 485, sick: 0, personal: 1, absent: 0 },
  { name: 'โอเว่น', late: 1, lateMin: 8, sick: 0, personal: 0, absent: 0 },
  { name: 'เกมส์', late: 85, lateMin: 1225, sick: 0, personal: 0, absent: 0 },
  { name: 'ก็อต', late: 39, lateMin: 565, sick: 1, personal: 4, absent: 0 },
  { name: 'ทิพย์', late: 57, lateMin: 442, sick: 2, personal: 0, absent: 0 },
  { name: 'อุ้ม', late: 50, lateMin: 645, sick: 0, personal: 0, absent: 0 },
  { name: 'ใบตอง', late: 26, lateMin: 535, sick: 6, personal: 3, absent: 3 },
  { name: 'เบนซ์', late: 23, lateMin: 125, sick: 0, personal: 5, absent: 0 },
  { name: 'ฟอร์ด', late: 0, lateMin: 0, sick: 0, personal: 0, absent: 0 },
  { name: 'พี่ยอด', late: 0, lateMin: 0, sick: 0, personal: 0, absent: 0 },
  { name: 'เจษ', late: 0, lateMin: 0, sick: 0, personal: 0, absent: 0 },
  { name: 'บอส', late: 0, lateMin: 0, sick: 0, personal: 0, absent: 0 },
  { name: 'บูม', late: 0, lateMin: 0, sick: 0, personal: 0, absent: 0 },
];

const Avatar = ({ name, size = 60, style = {} }) => {
  const img = getImage(name);
  if (img) {
    return <img src={img} alt={name} style={{width:size,height:size,borderRadius:'50%',objectFit:'cover',...style}} onError={(e)=>{e.target.style.display='none'}} />;
  }
  return (
    <div style={{width:size,height:size,borderRadius:'50%',background:'#e2e8f0',display:'flex',alignItems:'center',justifyContent:'center',...style}}>
      <User size={size*0.5} color="#94a3b8" />
    </div>
  );
};

export default function App() {
  const [slide, setSlide] = useState(0);
  const [person, setPerson] = useState(null);
  const total = 12;

  const getGrade = (s) => {
    if (s >= 90) return { g: 'A', c: '#16a34a' };
    if (s >= 80) return { g: 'B', c: '#2563eb' };
    if (s >= 70) return { g: 'C', c: '#ca8a04' };
    if (s >= 60) return { g: 'D', c: '#ea580c' };
    return { g: 'F', c: '#dc2626' };
  };

  const PersonModal = () => {
    if (!person) return null;
    const { g, c } = getGrade(person.total);
    return (
      <div style={{position:'fixed',inset:0,background:'rgba(0,0,0,0.6)',display:'flex',alignItems:'center',justifyContent:'center',zIndex:50,padding:20}} onClick={() => setPerson(null)}>
        <div style={{background:'white',borderRadius:20,width:'100%',maxWidth:500,maxHeight:'90vh',display:'flex',flexDirection:'column'}} onClick={e => e.stopPropagation()}>
          <div style={{background:person.teamColor,padding:24,borderRadius:'20px 20px 0 0',textAlign:'center',position:'relative'}}>
            <button onClick={() => setPerson(null)} style={{position:'absolute',left:20,top:20,color:'white',background:'none',border:'none',cursor:'pointer',fontSize:20}}><ArrowLeft size={28}/></button>
            <Avatar name={person.name} size={120} style={{margin:'0 auto 16px',border:'4px solid white'}} />
            <h2 style={{color:'white',margin:0,fontSize:32}}>{person.name}</h2>
            <p style={{color:'rgba(255,255,255,0.9)',margin:'8px 0 0',fontSize:20}}>{person.teamName}</p>
          </div>
          <div style={{padding:24,overflow:'auto',flex:1}}>
            <div style={{display:'flex',gap:16,marginBottom:20}}>
              <div style={{flex:1,background:'#eff6ff',padding:20,borderRadius:16,textAlign:'center'}}>
                <p style={{fontSize:18,color:'#64748b',margin:0}}>คะแนน</p>
                <p style={{fontSize:42,fontWeight:'bold',color:'#2563eb',margin:0}}>{person.total}</p>
              </div>
              <div style={{flex:1,background:'#f0fdf4',padding:20,borderRadius:16,textAlign:'center'}}>
                <p style={{fontSize:18,color:'#64748b',margin:0}}>เกรด</p>
                <p style={{fontSize:42,fontWeight:'bold',color:c,margin:0}}>{g}</p>
              </div>
            </div>
            <div style={{background:'#f8fafc',padding:20,borderRadius:16,marginBottom:20}}>
              <h3 style={{fontSize:22,margin:'0 0 16px'}}>รายละเอียดคะแนน</h3>
              {criteria.map((cr, i) => {
                const sc = person.scores[i];
                const low = sc < 8;
                return (
                  <div key={i} style={{display:'flex',justifyContent:'space-between',padding:12,marginBottom:8,borderRadius:8,background:low?'#fef2f2':'white',border:`2px solid ${low?'#fca5a5':'#e2e8f0'}`}}>
                    <span style={{fontSize:16,color:low?'#b91c1c':'#334155'}}>{cr}</span>
                    <span style={{fontSize:18,fontWeight:700,color:low?'#dc2626':'#2563eb'}}>{sc}/10</span>
                  </div>
                );
              })}
            </div>
            <div style={{background:'#fefce8',padding:20,borderRadius:16}}>
              <h3 style={{fontSize:22,margin:'0 0 12px'}}>หมายเหตุ</h3>
              <p style={{fontSize:18,color:'#475569',background:'white',padding:16,borderRadius:12,margin:0}}>{person.review || '-'}</p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const Slide0 = () => (
    <div style={{height:'100%',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',background:'linear-gradient(to bottom right,#0f172a,#1e293b)',color:'white',padding:40}}>
      <div style={{fontSize:80,marginBottom:24}}>📊</div>
      <h1 style={{fontSize:44,marginBottom:20,textAlign:'center'}}>การประเมินผลพนักงาน</h1>
      <p style={{fontSize:28,color:'#94a3b8',marginBottom:40}}>ประจำปี 2025</p>
      <div style={{display:'flex',gap:16,flexWrap:'wrap',justifyContent:'center'}}>
        {teams.map((t, i) => <span key={i} style={{padding:'12px 24px',borderRadius:30,background:t.color,fontSize:20}}>{t.name}</span>)}
      </div>
    </div>
  );

  const Slide1 = () => (
    <div style={{height:'100%',background:'linear-gradient(to bottom right,#f8fafc,#f1f5f9)',padding:24,overflow:'auto'}}>
      <h2 style={{fontSize:32,fontWeight:'bold',color:'#1e293b',marginBottom:24,display:'flex',alignItems:'center',gap:16}}><Users size={32} color="#2563eb"/> ภาพรวมทีมงาน</h2>
      <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:16}}>
        {teams.map((t, i) => (
          <div key={i} style={{background:t.color,color:'white',padding:20,borderRadius:16,cursor:'pointer'}} onClick={() => setSlide(2+i)}>
            <div style={{fontWeight:'bold',fontSize:24}}>{t.name}</div>
            <div style={{fontSize:20,opacity:0.9,marginTop:8}}>หัวหน้า: {t.leader}</div>
            <div style={{fontSize:20,opacity:0.9}}>สมาชิก: {t.members.length} คน</div>
          </div>
        ))}
      </div>
    </div>
  );

  const TeamSlide = ({ team }) => (
    <div style={{height:'100%',background:'white',padding:24,overflow:'auto'}}>
      <div style={{background:team.color,color:'white',padding:20,borderRadius:16,marginBottom:20,display:'flex',alignItems:'center',gap:20}}>
        <Avatar name={team.leader} size={80} />
        <div>
          <h2 style={{fontSize:32,margin:0}}>{team.name}</h2>
          <p style={{fontSize:22,margin:'8px 0 0',opacity:0.9}}>หัวหน้าทีม: {team.leader}</p>
        </div>
      </div>
      <div style={{background:'#f8fafc',padding:20,borderRadius:16,marginBottom:20}}>
        <div style={{fontSize:24,fontWeight:600,marginBottom:16}}>สมาชิก ({team.members.length} คน)</div>
        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:12}}>
          {team.members.map((m, i) => {
            const { g, c } = getGrade(m.total);
            return (
              <div key={i} style={{background:'white',padding:16,borderRadius:12,border:'2px solid #e2e8f0',cursor:'pointer',display:'flex',alignItems:'center',gap:12}} onClick={() => setPerson({...m,teamName:team.name,teamColor:team.color})}>
                <Avatar name={m.name} size={60} />
                <div>
                  <p style={{fontWeight:600,fontSize:20,margin:0}}>{m.name}</p>
                  <span style={{fontSize:18,color:'#475569'}}>{m.total}/100 </span>
                  <span style={{fontSize:18,fontWeight:'bold',color:c}}>({g})</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      {team.hasSales && teamSalesData[team.name] && (
        <div style={{background:'#f0fdf4',padding:20,borderRadius:16}}>
          <div style={{fontSize:24,fontWeight:600,marginBottom:16}}>💰 กำไรจากยอดขายปี 2568</div>
          <div style={{height:200}}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={months.map((m, i) => ({ month: m, sales: teamSalesData[team.name][i] }))}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" tick={{fontSize:14}} />
                <YAxis tick={{fontSize:14}} tickFormatter={v => (v/1000000).toFixed(1)+'M'} width={60} />
                <Tooltip formatter={v => v.toLocaleString() + ' ฿'} />
                <Line type="monotone" dataKey="sales" stroke="#10b981" strokeWidth={3} dot={{r:5}} />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div style={{textAlign:'center',marginTop:12}}>
            <span style={{fontSize:28,fontWeight:'bold',color:'#16a34a'}}>{teamSalesData[team.name].reduce((a,b)=>a+b,0).toLocaleString()} ฿</span>
          </div>
        </div>
      )}
    </div>
  );

  const SalesSlide = () => {
    const salesData = [
      { name: 'โอเว่น', total: 1776229, color: '#3b82f6' },
      { name: 'วุฒิ', total: 8367231, color: '#10b981' },
      { name: 'เกมส์', total: 17652303, color: '#a855f7' }
    ];
    return (
      <div style={{height:'100%',background:'linear-gradient(to bottom right,#f8fafc,#f1f5f9)',padding:24,overflow:'auto'}}>
        <h2 style={{fontSize:32,fontWeight:'bold',color:'#1e293b',marginBottom:24}}>💰 สรุปกำไรจากยอดขายปี 2568</h2>
        <div style={{background:'white',padding:24,borderRadius:16,marginBottom:20}}>
          <div style={{height:180}}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={salesData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" tick={{fontSize:18}} />
                <YAxis tick={{fontSize:14}} tickFormatter={v => (v/1000000).toFixed(0)+'M'} width={60} />
                <Tooltip formatter={v => v.toLocaleString() + ' ฿'} />
                <Bar dataKey="total" radius={[8,8,0,0]}>
                  {salesData.map((e, i) => <Cell key={i} fill={e.color} />)}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div style={{display:'flex',gap:12,marginBottom:20}}>
          {salesData.map((s,i) => (
            <div key={i} style={{flex:1,textAlign:'center',padding:20,background:i===0?'#dbeafe':i===1?'#dcfce7':'#f3e8ff',borderRadius:16}}>
              <p style={{fontSize:20,color:'#475569',margin:0}}>ทีม{s.name}</p>
              <p style={{fontSize:22,fontWeight:'bold',color:s.color,margin:'12px 0 0'}}>{s.total.toLocaleString()} ฿</p>
            </div>
          ))}
        </div>
        <div style={{background:'#dcfce7',padding:24,borderRadius:16,textAlign:'center'}}>
          <p style={{fontSize:22,color:'#475569',margin:0}}>รวมทั้งหมด</p>
          <p style={{fontSize:40,fontWeight:'bold',color:'#15803d',margin:0}}>27,795,765 ฿</p>
        </div>
      </div>
    );
  };

  const AllMembersSlide = () => {
    const allMembers = teams.flatMap(t => t.members.map(m => ({...m, teamName: t.name, teamColor: t.color}))).sort((a, b) => b.total - a.total);
    return (
      <div style={{height:'100%',background:'linear-gradient(to bottom right,#f8fafc,#f1f5f9)',padding:24,overflow:'auto'}}>
        <h2 style={{fontSize:32,fontWeight:'bold',color:'#1e293b',marginBottom:24}}>🏆 สรุปคะแนนทั้งหมด</h2>
        <div style={{background:'white',borderRadius:16,overflow:'hidden'}}>
          <table style={{width:'100%',fontSize:18,borderCollapse:'collapse'}}>
            <thead>
              <tr style={{background:'#4f46e5',color:'white'}}>
                <th style={{padding:16,textAlign:'center',width:50}}>#</th>
                <th style={{padding:16,textAlign:'left'}}>ชื่อ</th>
                <th style={{padding:16,textAlign:'center'}}>คะแนน</th>
                <th style={{padding:16,textAlign:'center'}}>เกรด</th>
              </tr>
            </thead>
            <tbody>
              {allMembers.map((m, i) => {
                const {g, c} = getGrade(m.total);
                return (
                  <tr key={i} style={{background: i%2===0?'white':'#f8fafc',cursor:'pointer'}} onClick={() => setPerson(m)}>
                    <td style={{padding:14,textAlign:'center',fontWeight:'bold',fontSize:20,color:i<3?'#eab308':'#64748b'}}>{i===0?'🥇':i===1?'🥈':i===2?'🥉':i+1}</td>
                    <td style={{padding:14}}>
                      <div style={{display:'flex',alignItems:'center',gap:12}}>
                        <Avatar name={m.name} size={50} />
                        <div>
                          <span style={{fontWeight:600,fontSize:20}}>{m.name}</span>
                          <div style={{background:m.teamColor,color:'white',padding:'4px 10px',borderRadius:8,fontSize:14,display:'inline-block',marginLeft:10}}>{m.teamName}</div>
                        </div>
                      </div>
                    </td>
                    <td style={{padding:14,textAlign:'center',fontWeight:'bold',fontSize:24}}>{m.total}</td>
                    <td style={{padding:14,textAlign:'center'}}><span style={{background:g==='A'?'#dcfce7':g==='B'?'#dbeafe':'#fef9c3',color:c,padding:'6px 16px',borderRadius:16,fontWeight:'bold',fontSize:18}}>{g}</span></td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  const AllScoresSlide = () => (
    <div style={{height:'100%',background:'linear-gradient(to bottom right,#f8fafc,#f1f5f9)',padding:24,overflow:'auto'}}>
      <h2 style={{fontSize:32,fontWeight:'bold',color:'#1e293b',marginBottom:24}}>📋 ตารางคะแนนรวมทุกทีม</h2>
      {teams.map((team, ti) => (
        <div key={ti} style={{marginBottom:24}}>
          <div style={{background:team.color,color:'white',padding:'12px 20px',borderRadius:'12px 12px 0 0',fontSize:22,fontWeight:'bold'}}>{team.name}</div>
          <div style={{background:'white',borderRadius:'0 0 12px 12px',overflow:'auto',border:`3px solid ${team.color}`,borderTop:'none'}}>
            <table style={{width:'100%',fontSize:16,borderCollapse:'collapse'}}>
              <thead>
                <tr style={{background:'#f1f5f9'}}>
                  <th style={{padding:12,textAlign:'left',borderBottom:'2px solid #e2e8f0',minWidth:180}}>หัวข้อ</th>
                  {team.members.map((m, i) => <th key={i} style={{padding:12,textAlign:'center',borderBottom:'2px solid #e2e8f0',minWidth:70}}>{m.name.substring(0,6)}</th>)}
                </tr>
              </thead>
              <tbody>
                {criteria.map((c, ci) => (
                  <tr key={ci} style={{background:ci%2===0?'white':'#fafafa'}}>
                    <td style={{padding:10,fontSize:15,borderBottom:'1px solid #f1f5f9'}}>{c}</td>
                    {team.members.map((m, mi) => {
                      const score = m.scores[ci], isLow = score < 8;
                      return <td key={mi} style={{padding:10,textAlign:'center',borderBottom:'1px solid #f1f5f9',background:isLow?'#fef2f2':'transparent',color:isLow?'#dc2626':'#2563eb',fontWeight:600,fontSize:17}}>{score}</td>;
                    })}
                  </tr>
                ))}
                <tr style={{background:team.color+'20',fontWeight:'bold'}}>
                  <td style={{padding:14,fontSize:18}}>รวม</td>
                  {team.members.map((m, mi) => {
                    const {g, c} = getGrade(m.total);
                    return <td key={mi} style={{padding:14,textAlign:'center',color:c,fontSize:18}}>{m.total} ({g})</td>;
                  })}
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      ))}
    </div>
  );

  const AttendanceSlide = () => {
    const topLate = [...attendanceData].sort((a, b) => b.late - a.late).slice(0, 5).filter(m => m.late > 0);
    return (
      <div style={{height:'100%',background:'linear-gradient(to bottom right,#f8fafc,#f1f5f9)',padding:24,overflow:'auto'}}>
        <h2 style={{fontSize:32,fontWeight:'bold',color:'#1e293b',marginBottom:24}}>📊 สถิติขาด ลา มาสาย</h2>
        <div style={{background:'white',borderRadius:16,overflow:'hidden',marginBottom:20}}>
          <table style={{width:'100%',fontSize:17,borderCollapse:'collapse'}}>
            <thead>
              <tr style={{background:'#4f46e5',color:'white'}}>
                <th style={{padding:14,textAlign:'left'}}>ชื่อ</th>
                <th style={{padding:14,textAlign:'center'}}>สาย (วัน)</th>
                <th style={{padding:14,textAlign:'center'}}>สาย (นาที)</th>
                <th style={{padding:14,textAlign:'center'}}>ป่วย</th>
                <th style={{padding:14,textAlign:'center'}}>กิจ</th>
                <th style={{padding:14,textAlign:'center'}}>ขาด</th>
              </tr>
            </thead>
            <tbody>
              {attendanceData.map((m, i) => (
                <tr key={i} style={{background: i%2===0?'white':'#f8fafc'}}>
                  <td style={{padding:12,fontWeight:600,fontSize:18}}>{m.name}</td>
                  <td style={{padding:12,textAlign:'center',color:m.late>50?'#dc2626':'inherit',fontWeight:m.late>50?'bold':'normal',fontSize:18}}>{m.late || '-'}</td>
                  <td style={{padding:12,textAlign:'center',color:m.lateMin>500?'#dc2626':'inherit',fontSize:18}}>{m.lateMin || '-'}</td>
                  <td style={{padding:12,textAlign:'center',fontSize:18}}>{m.sick || '-'}</td>
                  <td style={{padding:12,textAlign:'center',fontSize:18}}>{m.personal || '-'}</td>
                  <td style={{padding:12,textAlign:'center',color:m.absent>0?'#dc2626':'inherit',fontWeight:m.absent>0?'bold':'normal',fontSize:18}}>{m.absent || '-'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div style={{background:'#fee2e2',padding:20,borderRadius:16}}>
          <p style={{fontSize:22,fontWeight:'bold',color:'#dc2626',margin:'0 0 12px'}}>🚨 สายมากสุด Top 5</p>
          {topLate.map((m, i) => (
            <div key={i} style={{display:'flex',justifyContent:'space-between',fontSize:20,padding:'8px 0',borderBottom:i<topLate.length-1?'1px solid #fca5a5':'none'}}>
              <span>{i+1}. {m.name}</span><span style={{fontWeight:'bold'}}>{m.late} วัน ({m.lateMin} นาที)</span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const WorkSlide = () => {
    const totalSalary = workMembers.reduce((a, m) => a + m.salary, 0);
    const totalBonus = workMembers.reduce((a, m) => a + m.bonus, 0);
    return (
      <div style={{height:'100%',background:'linear-gradient(to bottom right,#f8fafc,#f1f5f9)',padding:24,overflow:'auto'}}>
        <h2 style={{fontSize:32,fontWeight:'bold',color:'#1e293b',marginBottom:24}}>📅 ตารางอายุงาน</h2>
        <div style={{background:'white',borderRadius:16,overflow:'hidden'}}>
          <table style={{width:'100%',fontSize:17,borderCollapse:'collapse'}}>
            <thead>
              <tr style={{background:'#4f46e5',color:'white'}}>
                <th style={{padding:14,textAlign:'left'}}>ชื่อ</th>
                <th style={{padding:14,textAlign:'right'}}>เงินเดือน</th>
                <th style={{padding:14,textAlign:'center'}}>อายุงาน</th>
                <th style={{padding:14,textAlign:'right'}}>โบนัส</th>
              </tr>
            </thead>
            <tbody>
              {workMembers.map((m, i) => (
                <tr key={i} style={{background: m.warning ? '#fef2f2' : (i%2===0?'white':'#f8fafc'), border: m.warning ? '3px solid #ef4444' : 'none'}}>
                  <td style={{padding:12}}>
                    <div style={{display:'flex',alignItems:'center',gap:10}}>
                      <Avatar name={m.name} size={45} />
                      <div>
                        {m.warning && <span style={{marginRight:6}}>⚠️</span>}
                        <span style={{fontWeight:600,fontSize:18}}>{m.name}</span>
                        <div style={{background:m.color,color:'white',padding:'3px 10px',borderRadius:8,fontSize:13,display:'inline-block',marginLeft:8}}>{m.team}</div>
                      </div>
                    </div>
                  </td>
                  <td style={{padding:12,textAlign:'right',color:'#2563eb',fontWeight:600,fontSize:18}}>฿{m.salary.toLocaleString()}</td>
                  <td style={{padding:12,textAlign:'center'}}>
                    <span style={{background:m.years>=5?'#f3e8ff':m.years>=3?'#dbeafe':m.years>=1?'#dcfce7':'#ffedd5',color:m.years>=5?'#7c3aed':m.years>=3?'#2563eb':m.years>=1?'#16a34a':'#ea580c',padding:'6px 14px',borderRadius:16,fontSize:16,fontWeight:'bold'}}>{m.years}ปี {m.months}ด.</span>
                  </td>
                  <td style={{padding:12,textAlign:'right',color:'#16a34a',fontWeight:'bold',fontSize:18}}>฿{m.bonus.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr style={{background:'#e0e7ff',fontWeight:'bold'}}>
                <td style={{padding:16,fontSize:20}}>รวม</td>
                <td style={{padding:16,textAlign:'right',color:'#2563eb',fontSize:20}}>฿{totalSalary.toLocaleString()}</td>
                <td></td>
                <td style={{padding:16,textAlign:'right',color:'#16a34a',fontSize:20}}>฿{totalBonus.toLocaleString()}</td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    );
  };

  const SummarySlide = () => {
    const all = teams.flatMap(t => t.members);
    const avg = Math.round(all.reduce((a, m) => a + m.total, 0) / all.length);
    return (
      <div style={{height:'100%',background:'linear-gradient(to bottom right,#0f172a,#1e293b)',color:'white',padding:32,display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center'}}>
        <TrendingUp size={64} color="#4ade80" style={{marginBottom:20}} />
        <h2 style={{fontSize:36,marginBottom:24}}>สรุปผลการประเมิน</h2>
        <div style={{background:'rgba(255,255,255,0.1)',padding:28,borderRadius:20,marginBottom:28,textAlign:'center'}}>
          <p style={{fontSize:22,color:'#94a3b8',margin:0}}>คะแนนเฉลี่ย</p>
          <p style={{fontSize:64,fontWeight:'bold',margin:0}}>{avg}/100</p>
        </div>
        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr',gap:16,width:'100%',maxWidth:500}}>
          <div style={{background:'rgba(255,255,255,0.1)',padding:20,borderRadius:16,textAlign:'center'}}>
            <p style={{fontSize:36,fontWeight:'bold',color:'#4ade80',margin:0}}>{all.filter(m=>m.total>=90).length}</p>
            <p style={{fontSize:18,color:'#94a3b8',margin:0}}>ดีเยี่ยม (A)</p>
          </div>
          <div style={{background:'rgba(255,255,255,0.1)',padding:20,borderRadius:16,textAlign:'center'}}>
            <p style={{fontSize:36,fontWeight:'bold',color:'#60a5fa',margin:0}}>{all.filter(m=>m.total>=80&&m.total<90).length}</p>
            <p style={{fontSize:18,color:'#94a3b8',margin:0}}>ดี (B)</p>
          </div>
          <div style={{background:'rgba(255,255,255,0.1)',padding:20,borderRadius:16,textAlign:'center'}}>
            <p style={{fontSize:36,fontWeight:'bold',color:'#facc15',margin:0}}>{all.filter(m=>m.total<80).length}</p>
            <p style={{fontSize:18,color:'#94a3b8',margin:0}}>ปรับปรุง</p>
          </div>
        </div>
        <p style={{color:'#64748b',fontSize:24,marginTop:32}}>ขอบคุณที่รับฟัง 🙏</p>
      </div>
    );
  };

  const render = () => {
    if (slide === 0) return <Slide0 />;
    if (slide === 1) return <Slide1 />;
    if (slide >= 2 && slide <= 6) return <TeamSlide team={teams[slide-2]} />;
    if (slide === 7) return <SalesSlide />;
    if (slide === 8) return <AllMembersSlide />;
    if (slide === 9) return <AllScoresSlide />;
    if (slide === 10) return <AttendanceSlide />;
    if (slide === 11) return <WorkSlide />;
    return <SummarySlide />;
  };

  return (
    <div style={{width:'100%',height:'100vh',background:'#e2e8f0',display:'flex',flexDirection:'column'}}>
      {person && <PersonModal />}
      <div style={{flex:1,margin:16,borderRadius:20,overflow:'hidden',boxShadow:'0 25px 50px -12px rgba(0,0,0,0.25)'}}>{render()}</div>
      <div style={{display:'flex',alignItems:'center',justifyContent:'center',gap:20,padding:16,background:'#1e293b'}}>
        <button onClick={() => setSlide(s => Math.max(s-1,0))} disabled={slide===0} style={{padding:14,borderRadius:'50%',background:'rgba(255,255,255,0.2)',color:'white',border:'none',cursor:'pointer',opacity:slide===0?0.3:1}}><ChevronLeft size={28}/></button>
        <div style={{display:'flex',gap:8}}>{Array.from({length:total}).map((_,i) => <button key={i} onClick={() => setSlide(i)} style={{width:14,height:14,borderRadius:'50%',background:slide===i?'white':'rgba(255,255,255,0.4)',border:'none',cursor:'pointer'}}/>)}</div>
        <button onClick={() => setSlide(s => Math.min(s+1,total-1))} disabled={slide===total-1} style={{padding:14,borderRadius:'50%',background:'rgba(255,255,255,0.2)',color:'white',border:'none',cursor:'pointer',opacity:slide===total-1?0.3:1}}><ChevronRight size={28}/></button>
        <span style={{color:'rgba(255,255,255,0.6)',marginLeft:16,fontSize:20}}>{slide+1}/{total}</span>
      </div>
    </div>
  );
}
