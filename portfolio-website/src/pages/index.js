import About from 'src/Components/About/About';
import Education from 'src/Components/Education/Education';
import Experience from 'src/Components/Experience/Experience';
import Skills from 'src/Components/Skills/Skills';
import Interests from 'src/Components/Interests/Interests';
import Awards from 'src/Components/Awards/Awards';
import Projects from 'src/Components/Projects/Projects';

export default function Home() {
    return (
        <>
            <About />
            <Experience />
            <Education />
            <Projects />
            <Skills />
            <Interests />
            <Awards />
        </>
    );
}
