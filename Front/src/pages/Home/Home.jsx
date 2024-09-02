import Banner from '@/components/Banner/Banner.jsx';
import Item from '@/components//Item/Item.jsx';
import FeaturesItemData from './data.json';
import iconChat from '@/assets/icons/icon-chat.png';
import iconMoney from '@/assets/icons/icon-money.png';
import iconSecurity from '@/assets/icons/icon-security.png';
import './Home.sass';

/* Home page */
function Home () {
    const imageData = {
        "icon-chat.webp": iconChat,
        "icon-money.webp": iconMoney,
        "icon-security.webp": iconSecurity
    }

    return (
        <div className='homepage'>
            <main>
                <Banner />
                <section className="features">
                    {FeaturesItemData.map((data) => (
                        <Item 
                            key={data.id}
                            image={imageData[data.image]}
                            descriptionImage={data.descriptionImage}
                            title={data.title}
                            description={data.description}
                        />
                    ))}
                </section>
            </main>
        </div>
    )
}

export default Home