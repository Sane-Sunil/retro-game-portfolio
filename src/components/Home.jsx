import './Home.css';

function Home() {
  const name = "ane Sunil ";
  
  return (
    <section id="home">
        <h1><span id='m' className='hover-char'>S</span>
          {name.split('').map((char, index) => (
            <span key={index} className="hover-char">{char === ' ' ? '\u00A0' : char}</span>
          ))}
          <span className='blinker'>_</span>
        </h1>
        <p>Passionate web developer dedicated to creating beautiful and functional websites</p>
    </section>
  );
}

export default Home;
