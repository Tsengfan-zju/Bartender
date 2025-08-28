import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Home.css';

function Home() {
  return (
    <div className="home-container">
      <header className="home-header">
        <h1>智能啤酒机使用教程</h1>
        <p>为用户、店员和老板提供全面的使用指南</p>
      </header>
      
      <main className="home-main">
        <div className="hero-image">
          {/* 这里将放置公司的大图，使用占位图 */}
          <div className="placeholder-image">
            <p>公司大图占位</p>
          </div>
        </div>
        
        <div className="intro-text">
          <h2>欢迎使用我们的智能啤酒机系统</h2>
          <p>本教程将帮助您了解如何有效地使用我们的智能啤酒机。根据您的角色，选择相应的使用路线：</p>
        </div>
        
        <div className="role-selection">
          <Link to="/level1" className="role-card">
            <h3>用户使用指南</h3>
            <p>了解如何使用啤酒机购买啤酒</p>
          </Link>
          
          <Link to="/level2" className="role-card">
            <h3>店员维护指南</h3>
            <p>学习如何维护和管理啤酒机</p>
          </Link>
          
          <Link to="/level3" className="role-card">
            <h3>老板管理指南</h3>
            <p>掌握系统管理和数据分析</p>
          </Link>
          
          <Link to="/level4" className="role-card">
            <h3>常见问题及默认参数</h3>
            <p>查看常见问题解答和系统默认设置</p>
          </Link>
        </div>
        
        {/* 图片插入指南链接 */}
        <div className="guide-link-container">
          <Link to="/image-guide" className="guide-link">
            查看图片插入指南
          </Link>
        </div>
      </main>
    </div>
  );
}

export default Home;