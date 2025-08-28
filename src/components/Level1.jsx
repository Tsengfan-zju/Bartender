import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Level1.css';

function Level1() {
  const [activeScenario, setActiveScenario] = useState('normal');
  const [activeStep, setActiveStep] = useState(1);

  // 正常情况的步骤数据
  const normalSteps = [
    { id: 1, title: '选择啤酒', description: '在主界面选择您喜欢的啤酒类型。系统会显示所有可用的啤酒选项。' },
    { id: 2, title: '确认选择', description: '确认您的啤酒选择。检查价格和容量信息是否正确。' },
    { id: 3, title: '支付方式', description: '选择支付方式，可以使用微信支付、支付宝或银行卡支付。' },
    { id: 4, title: '扫码支付', description: '使用手机扫描屏幕上的二维码进行支付。' },
    { id: 5, title: '等待出酒', description: '支付成功后，系统开始出酒。请耐心等待啤酒完全流出。' },
    { id: 6, title: '取酒完成', description: '啤酒已经准备好，请取走您的啤酒并享受。记得拿走您的银行卡或手机。' }
  ];

  // 超时情况的步骤数据
  const timeoutSteps = [
    { id: 1, title: '操作超时提示', description: '系统显示操作超时提示，提示您的操作已经超过了规定时间。' },
    { id: 2, title: '返回主界面', description: '系统自动返回主界面，您可以重新开始选择啤酒的流程。' },
    { id: 3, title: '重新选择', description: '在主界面重新选择您喜欢的啤酒类型，系统会重新计时。' },
    { id: 4, title: '快速操作', description: '尽量在规定时间内完成操作，避免再次超时。' },
    { id: 5, title: '联系客服', description: '如果频繁出现超时问题，可以联系客服寻求帮助。' }
  ];

  // 售罄情况的步骤数据
  const soldoutSteps = [
    { id: 1, title: '售罄提示', description: '当您选择的啤酒显示为售罄状态时，系统会有明确的提示。' },
    { id: 2, title: '选择其他啤酒', description: '系统会引导您选择其他可用的啤酒类型。' },
    { id: 3, title: '查看补货时间', description: '有些系统会显示下一次补货的预计时间。' },
    { id: 4, title: '添加到提醒列表', description: '您可以将售罄的啤酒添加到提醒列表，以便补货后收到通知。' },
    { id: 5, title: '推荐类似啤酒', description: '系统会根据您的喜好推荐类似口味的啤酒。' },
    { id: 6, title: '继续购买', description: '选择替代啤酒后，继续购买流程。' }
  ];

  // 根据当前选择的场景获取对应的步骤数据
  const getCurrentSteps = () => {
    switch(activeScenario) {
      case 'normal': return normalSteps;
      case 'timeout': return timeoutSteps;
      case 'soldout': return soldoutSteps;
      default: return normalSteps;
    }
  };

  const currentSteps = getCurrentSteps();

  return (
    <div className="level1-container">
      <header className="level1-header">
        <h1>用户使用路线</h1>
        <p>了解如何使用啤酒机的不同场景</p>
      </header>

      <main className="level1-main">
        {/* 导航回到首页 */}
        <div className="breadcrumb">
          <Link to="/">首页</Link> / <span>用户使用路线</span>
        </div>

        {/* 场景选择器 */}
        <div className="scenario-selector">
          <button 
            className={`scenario-btn ${activeScenario === 'normal' ? 'active' : ''}`}
            onClick={() => { setActiveScenario('normal'); setActiveStep(1); }}
          >
            正常流程
          </button>
          <button 
            className={`scenario-btn ${activeScenario === 'timeout' ? 'active' : ''}`}
            onClick={() => { setActiveScenario('timeout'); setActiveStep(1); }}
          >
            操作超时
          </button>
          <button 
            className={`scenario-btn ${activeScenario === 'soldout' ? 'active' : ''}`}
            onClick={() => { setActiveScenario('soldout'); setActiveStep(1); }}
          >
            啤酒售罄
          </button>
        </div>

        {/* 步骤导航器 */}
        <div className="step-navigator">
          {currentSteps.map(step => (
            <button
              key={step.id}
              className={`step-btn ${activeStep === step.id ? 'active' : ''}`}
              onClick={() => setActiveStep(step.id)}
            >
              {step.id}
            </button>
          ))}
        </div>

        {/* 步骤内容区域 */}
        <div className="step-content">
          {currentSteps.map(step => (
            <div 
              key={step.id} 
              className={`step-item ${activeStep === step.id ? 'active' : 'hidden'}`}
            >
              <div className="step-image">
                {/* 图片占位符，保持600*1024的比例 */}
                <div className="placeholder-image">
                  <p>{activeScenario === 'normal' ? '正常流程' : activeScenario === 'timeout' ? '超时流程' : '售罄流程'} - 步骤 {step.id}</p>
                </div>
              </div>
              <div className="step-description">
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* 前后导航按钮 */}
        <div className="navigation-buttons">
          <button 
            className="nav-btn prev-btn"
            onClick={() => setActiveStep(Math.max(1, activeStep - 1))}
            disabled={activeStep === 1}
          >
            上一步
          </button>
          <button 
            className="nav-btn next-btn"
            onClick={() => setActiveStep(Math.min(currentSteps.length, activeStep + 1))}
            disabled={activeStep === currentSteps.length}
          >
            下一步
          </button>
        </div>
      </main>
    </div>
  );
}

export default Level1;