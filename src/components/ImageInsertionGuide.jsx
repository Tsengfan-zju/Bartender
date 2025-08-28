import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/ImageInsertionGuide.css';
// 示例：导入图片
// import beerImage from '../assets/beer.jpg';
// import machineImage from '../assets/machine.png';

function ImageInsertionGuide() {
  return (
    <div className="image-guide-container">
      <h1>图片插入指南</h1>
      
      <div className="guide-section">
        <h2>步骤1：准备图片</h2>
        <p>将您的照片准备好，建议使用以下格式：</p>
        <ul>
          <li>JPG、PNG、SVG格式均可</li>
          <li>对于大图片，建议压缩至合适大小以提高加载速度</li>
          <li>确保图片命名规范，不含特殊字符</li>
        </ul>
      </div>

      <div className="guide-section">
        <h2>步骤2：放置图片文件</h2>
        <p>将图片文件放置在项目的 <code>src/assets/</code> 目录下</p>
        <div className="code-block">
          d:\工程\trae_h\src\assets\
          <ul>
            <li>beer1.jpg</li>
            <li>beer-machine.png</li>
            <li>...其他图片文件</li>
          </ul>
        </div>
      </div>

      <div className="guide-section">
        <h2>步骤3：在组件中导入图片</h2>
        <p>在需要使用图片的组件文件顶部添加导入语句：</p>
        <div className="code-block">
          {/* 在组件文件顶部添加 */}
          import beerImage from '../assets/beer1.jpg';
          import machineImage from '../assets/beer-machine.png';
        </div>
      </div>

      <div className="guide-section">
        <h2>步骤4：在JSX中使用图片</h2>
        <p>在组件的JSX代码中使用图片：</p>
        <div className="code-block">
          {/* 在return的JSX中使用 */}
          &lt;img src={beerImage} alt="啤酒展示图" className="beer-image" /&gt;
          <br />
          &lt;img src={machineImage} alt="啤酒机图片" className="machine-image" /&gt;
        </div>
      </div>

      <div className="guide-section">
        <h2>步骤5：添加样式（可选）</h2>
        <p>在对应的CSS文件中添加图片样式：</p>
        <div className="code-block">
          {/* 在CSS文件中添加 */}
          .beer-image {
            width: 100%;
            max-width: 500px;
            height: auto;
            border-radius: 8px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
          }
        </div>
      </div>

      <div className="guide-section">
        <h2>在现有页面中替换占位图</h2>
        <p>例如，在Home.jsx中替换公司大图占位：</p>
        <div className="code-block">
          {/* 原来的占位代码 */}
          &lt;div className="hero-image"&gt;
            &lt;div className="placeholder-image"&gt;
              &lt;p&gt;公司大图占位&lt;/p&gt;
            &lt;/div&gt;
          &lt;/div&gt;
          
          {/* 替换为实际图片 */}
          &lt;div className="hero-image"&gt;
            &lt;img src={companyImage} alt="公司宣传图" className="company-image" /&gt;
          &lt;/div&gt;
        </div>
      </div>

      <div className="guide-section">
        <h2>在Level4页面中添加图片</h2>
        <p>您可以在Level4的FAQ或参数页面中添加相关图片：</p>
        <div className="code-block">
          {/* 在Level4.jsx中添加 */}
          import faqImage from '../assets/faq-image.jpg';
          
          {/* 在FAQ项目中使用 */}
          &lt;div className="faq-item"&gt;
            &lt;h3 className="faq-question"&gt;问题标题&lt;/h3&gt;
            &lt;img src={faqImage} alt="问题说明图" className="faq-image" /&gt;
            &lt;div className="faq-answers"&gt;
              {/* 回答内容 */}
            &lt;/div&gt;
          &lt;/div&gt;
        </div>
      </div>

      <Link to="/" className="back-link">返回首页</Link>
    </div>
  );
}

export default ImageInsertionGuide;