import './hero.css';

export default function Hero() {
    return (
        <section className='hero'>
            <h1 className='hero-title'>
                Carson <span className='accent'>Tollison</span>
            </h1>
            <h2 className='hero-description'>Software Engineer</h2>
            <a href='mailto:tollisoncarson@gmail.com'>
                <button className='contact-button'>Contact Me</button>
            </a>
        </section>
    );
}
