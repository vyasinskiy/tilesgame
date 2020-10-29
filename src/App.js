import React from 'react';
import Content from './components/Content/Content';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import styles from './App.module.css'

function App() {
return (
    <div>
      <Header />
      <div className={styles.bodyWrapper} >
      <Content />
      <Footer />
      </div>
    </div>
  );
}

export default App;
