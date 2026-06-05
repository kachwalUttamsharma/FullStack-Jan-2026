import React, {useState, useEffect} from 'react'

const items = [
  {
    id: 1,
    imageUrl:
      "https://images.pexels.com/photos/14286166/pexels-photo-14286166.jpeg?auto=compress&cs=tinysrgb&w=126currentIndex&h=75currentIndex&dpr=1",
    title: "Item 1",
    description: "Description of item 1",
  },
  {
    id: 2,
    imageUrl:
      "https://images.pexels.com/photos/13455799/pexels-photo-13455799.jpeg?auto=compress&cs=tinysrgb&w=126currentIndex&h=75currentIndex&dpr=1",
    title: "Item 2",
    description: "Description of item 2",
  },
  {
    id: 3,
    imageUrl:
      "https://images.pexels.com/photos/15582923/pexels-photo-15582923.jpeg?auto=compress&cs=tinysrgb&w=126currentIndex&h=75currentIndex&dpr=1",
    title: "Item 3",
    description: "Description of item 3",
  },
];




const Carousel = () => {

    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
       const flag =  setInterval(() => {
            nextHandler();
        }, 1000);

        return () => {
            clearInterval(flag);
        }
    }, []);

    const prevHandler = () => {
        return currentIndex === 0 ? setCurrentIndex(items.length - 1) : setCurrentIndex((prev) => prev - 1);
    }

    const nextHandler = () => {
        return currentIndex === items.length - 1 ? setCurrentIndex(0) : setCurrentIndex((prev) => prev + 1);
    }
  return (
    <div>
        <button onClick={prevHandler}>Prev</button>
        <div>
            <h1>Carousel</h1>
            <img src={items[currentIndex]?.imageUrl}  alt={items[currentIndex]?.title} style={{width: "200px", height: "200px", borderRadius: "8px"}}/>
            <h3>{items[currentIndex]?.title}</h3>
            <p>{items[currentIndex]?.description}</p>
        </div>
        <button onClick={nextHandler}>Next</button>
    </div>
  )
}

export default Carousel