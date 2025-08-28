import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Level4.css';

function Level4() {
  // 使用useState管理当前激活的标签页
  const [activeTab, setActiveTab] = useState('faq');
  
  // 常见问题数据
  const faqs = [
    {
      id: 1,
      question: '一直显示"暂停/售罄"',
      answers: [
        '检查是否 在售 、是否更换酒桶；',
        '看"容器容量 − 累计售卖"是否 大于 报警阈值；',
        '更换酒桶后别忘了 清零累计 并设置 新桶容量 。'
      ]
    },
    {
      id: 2,
      question: '扫码后不出酒',
      answers: [
        '维护页改了前缀/后缀后， 务必保存 并回到支付页 试扫 ；'
      ]
    },
    {
      id: 3,
      question: '出酒超时',
      answers: [
        '默认 30s；10s 时已发送 T_OUT ，语音播报即将超时请尽快打酒，0s 时发送 T_OVER ，提示超时，然后照常 3 秒返回；',
        '可在管理页调大 限制时间 。'
      ]
    },
    {
      id: 4,
      question: '出酒量不准/泡沫多',
      answers: [
        '用量杯做一次 脉冲校准 （500ml/脉冲数→保存）。'
      ]
    },
    {
      id: 5,
      question: '忘记管理员密码',
      answers: [
        '使用左上角的 恢复出厂设置 热区（PIN3： XTR123 ），恢复后 PIN1 变为 123456 。'
      ]
    }
  ];

  // 默认参数数据
  const defaultParams = [
    { name: '名称', value: '青岛啤酒' },
    { name: '价格', value: '18.88 元/500ml' },
    { name: '单次出酒', value: '500ml' },
    { name: '容器容量', value: '10000ml' },
    { name: '报警阈值', value: '200ml' },
    { name: '限制时间', value: '30s' },
    { name: '累计售卖', value: '0ml' },
    { name: '脉冲校准', value: '500ml / 400 脉冲（ppml=0.8）' },
    { name: '管理员 PIN1', value: '123456（请尽快修改）' }
  ];

  // 切换标签页的处理函数
  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
  };

  return (
    <div className="level4-container">
      <header className="level4-header">
        <h1>常见问题及默认参数</h1>
        <p>解决您可能遇到的问题和了解系统默认设置</p>
      </header>

      <main className="level4-main">
        {/* 导航回到首页 */}
        <div className="breadcrumb">
          <Link to="/">首页</Link> / <span>常见问题及默认参数</span>
        </div>

        {/* 内容切换选项卡 */}
        <div className="tabs">
          <button 
            className={`tab-btn ${activeTab === 'faq' ? 'active' : ''}`} 
            id="faq-tab"
            onClick={() => handleTabClick('faq')}
          >
            常见问题
          </button>
          <button 
            className={`tab-btn ${activeTab === 'params' ? 'active' : ''}`} 
            id="params-tab"
            onClick={() => handleTabClick('params')}
          >
            默认参数
          </button>
        </div>

        {/* 常见问题内容 */}
        <div 
          className={`tab-content ${activeTab === 'faq' ? 'active' : 'hidden'}`} 
          id="faq-content"
        >
          <div className="faq-list">
            {faqs.map(faq => (
              <div key={faq.id} className="faq-item">
                <h3 className="faq-question">
                  <span className="faq-number">{faq.id}.</span>
                  {faq.question}
                </h3>
                <div className="faq-answers">
                  {faq.answers.map((answer, index) => (
                    <p key={index} className="faq-answer">{answer}</p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 默认参数内容 */}
        <div 
          className={`tab-content ${activeTab === 'params' ? 'active' : 'hidden'}`} 
          id="params-content"
        >
          <h2 className="params-title">默认参数一览（出厂设置）</h2>
          <div className="params-list">
            {defaultParams.map((param, index) => (
              <div key={index} className="param-item">
                <span className="param-name">● {param.name}：</span>
                <span className="param-value">{param.value}</span>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}

export default Level4;