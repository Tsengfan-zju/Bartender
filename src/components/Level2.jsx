import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Level2.css';

function Level2() {
  const [activeScenario, setActiveScenario] = useState('management');
  const [activeStep, setActiveStep] = useState(1);

  // 管理情况的步骤数据
  const managementSteps = [
    { id: 1, title: '进入管理模式', description: '使用店员身份卡或输入密码进入啤酒机的管理模式。确保在非营业时间进行操作以避免打扰顾客。' },
    { id: 2, title: '检查库存状态', description: '在管理界面查看各啤酒的库存状态。系统会显示每种啤酒的剩余量和预计可售出的杯数。' },
    { id: 3, title: '管理系统设置', description: '根据需要调整系统设置，如价格、出酒量、促销活动等。确保所有设置符合公司政策。' }
  ];

  // 测试脉冲的步骤数据
  const pulseTestSteps = [
    { id: 1, title: '进入测试模式', description: '在管理界面中选择进入测试模式。这个模式用于诊断和维护机器。' },
    { id: 2, title: '选择脉冲测试', description: '在测试选项中找到并选择"脉冲测试"功能。此功能用于测试啤酒机的各个电磁阀和传感器。' },
    { id: 3, title: '选择测试对象', description: '选择需要测试的啤酒通道。可以选择单个通道或同时测试多个通道。' },
    { id: 4, title: '执行测试', description: '点击"开始测试"按钮，观察啤酒机的反应。系统会发送测试脉冲到选定的电磁阀。' },
    { id: 5, title: '检查结果', description: '测试完成后，系统会显示测试结果。检查是否有异常情况，如无响应或响应异常的电磁阀。' },
    { id: 6, title: '记录并报告', description: '记录测试结果，如发现问题，及时报告给维修人员进行处理。完成测试后退出测试模式。' }
  ];

  // 根据当前选择的场景获取对应的步骤数据
  const getCurrentSteps = () => {
    switch(activeScenario) {
      case 'management': return managementSteps;
      case 'pulseTest': return pulseTestSteps;
      default: return managementSteps;
    }
  };

  const currentSteps = getCurrentSteps();

  return (
    <div className="level2-container">
      <header className="level2-header">
        <h1>店员维护指南</h1>
        <p>学习如何维护和管理啤酒机</p>
      </header>

      <main className="level2-main">
        {/* 导航回到首页 */}
        <div className="breadcrumb">
          <Link to="/">首页</Link> / <span>店员维护指南</span>
        </div>

        {/* 场景选择器 */}
        <div className="scenario-selector">
          <button 
            className={`scenario-btn ${activeScenario === 'management' ? 'active' : ''}`}
            onClick={() => { setActiveScenario('management'); setActiveStep(1); }}
          >
            日常管理
          </button>
          <button 
            className={`scenario-btn ${activeScenario === 'pulseTest' ? 'active' : ''}`}
            onClick={() => { setActiveScenario('pulseTest'); setActiveStep(1); }}
          >
            测试脉冲
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
                  <p>{activeScenario === 'management' ? '日常管理' : '测试脉冲'} - 步骤 {step.id}</p>
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

export default Level2;