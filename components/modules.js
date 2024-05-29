// Modules
import Hero from './modules/hero'
import TimelineImageContent from './modules/timelineImageContent'
import AboutSection from './modules/aboutSection'
import Team from './modules/team'
import Sponsors from './modules/sponsors'
import FeatureContent from './modules/featureContent'
import Copy from './modules/copy'


export default function Modules({ data, bios, showForm, setShowForm }) {
    function getModule(module, index) {
        switch(module.__component) {
            case ('modules.hero'):
                return <Hero 
                    key={index}
                    data={module} 
                    showForm={showForm} 
                    setShowForm={setShowForm} 
                    index={index} />

            case ('modules.timeline-image-and-content'):
                return <TimelineImageContent
                    key={index} 
                    data={module} 
                    showForm={showForm} 
                    setShowForm={setShowForm}
                    index={index} />
                
            case ('modules.about-details'):
                return <AboutSection
                    key={index} 
                    data={module} 
                    showForm={showForm} 
                    setShowForm={setShowForm}
                    index={index} />

            case ('modules.team'):
                return <Team
                    key={index} 
                    data={module} 
                    bios={bios} 
                    showForm={showForm} 
                    setShowForm={setShowForm}
                    index={index} />

            case ('modules.sponsors'):
                return <Sponsors
                    key={index} 
                    data={module} 
                    showForm={showForm} 
                    setShowForm={setShowForm}
                    index={index} />
            
            case ('modules.feature-content'):
                return <FeatureContent
                    key={index} 
                    data={module} 
                    showForm={showForm} 
                    setShowForm={setShowForm}
                    index={index} />

            case ('modules.copy'):
                return <Copy
                    key={index} 
                    data={module} 
                    showForm={showForm} 
                    setShowForm={setShowForm}
                    index={index} />
        }
    }

    return (
        <div className="modules w-full">
            {data &&
                data.attributes.Modules.map((module, index) => (
                getModule(module, index)
            ))} 
        </div>
    )
}