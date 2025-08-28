import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Level3.css';

function Level3() {
  const [activeScenario, setActiveScenario] = useState('analytics');
  const [activeStep, setActiveStep] = useState(1);

  // 数据分析的步骤数据
  const analyticsSteps = [
    { id: 1, title: '进入老板管理界面', description: '使用老板账号和密码登录啤酒机的管理系统。确保在安全的网络环境下进行操作。' },
    { id: 2, title: '查看销售数据', description: '在管理界面查看啤酒机的销售数据统计。系统会显示各时段、各啤酒的销售情况和收入统计。' },
    { id: 3, title: '分析经营状况', description: '根据销售数据和库存情况，分析啤酒机的经营状况，做出相应的经营决策，如调整啤酒种类、价格或促销活动。' }
  ];

  // 系统设置的步骤数据
  const settingsSteps = [
    { id: 1, title: '系统高级设置', description: '在老板管理界面中找到并进入"系统高级设置"选项。这里包含了啤酒机的核心配置选项。' }
  ];

  // 根据当前选择的场景获取对应的步骤数据
  const getCurrentSteps = () => {
    switch(activeScenario) {
      case 'analytics': return analyticsSteps;
      case 'settings': return settingsSteps;
      default: return analyticsSteps;
    }
  };

  const currentSteps = getCurrentSteps();

  return (
    <div className="level3-container">
      <header className="level3-header">
        <h1>老板管理指南</h1>
        <p>掌握系统管理和数据分析</p>
      </header>

      <main className="level3-main">
        {/* 导航回到首页 */}
        <div className="breadcrumb">
          <Link to="/">首页</Link> / <span>老板管理指南</span>
        </div>

        {/* 场景选择器 */}
        <div className="scenario-selector">
          <button 
            className={`scenario-btn ${activeScenario === 'analytics' ? 'active' : ''}`}
            onClick={() => { setActiveScenario('analytics'); setActiveStep(1); }}
          >
            数据分析
          </button>
          <button 
            className={`scenario-btn ${activeScenario === 'settings' ? 'active' : ''}`}
            onClick={() => { setActiveScenario('settings'); setActiveStep(1); }}
          >
            系统设置
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
                  <p>{activeScenario === 'analytics' ? '数据分析' : '系统设置'} - 步骤 {step.id}</p>
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

export default Level3;